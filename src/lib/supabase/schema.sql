-- ============================================
-- SPARK IDX DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- PROFILES TABLE (extends auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  first_name TEXT,
  last_name TEXT,
  phone TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user' CHECK (role IN ('user', 'agent', 'admin')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, first_name, last_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'first_name',
    NEW.raw_user_meta_data->>'last_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- FAVORITES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  mls_number TEXT NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, mls_number)
);

CREATE INDEX idx_favorites_user_id ON public.favorites(user_id);
CREATE INDEX idx_favorites_mls_number ON public.favorites(mls_number);

-- ============================================
-- SAVED SEARCHES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.saved_searches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  params JSONB NOT NULL DEFAULT '{}',
  email_alerts BOOLEAN DEFAULT true,
  frequency TEXT DEFAULT 'daily' CHECK (frequency IN ('instant', 'daily', 'weekly')),
  last_notified TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_saved_searches_user_id ON public.saved_searches(user_id);

-- ============================================
-- LEADS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT,
  mls_number TEXT,
  source TEXT DEFAULT 'contact_form' CHECK (source IN ('contact_form', 'showing_request', 'saved_search', 'registration')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  agent_id UUID REFERENCES public.profiles(id),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_agent_id ON public.leads(agent_id);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- ============================================
-- SHOWING REQUESTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.showing_requests (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  mls_number TEXT NOT NULL,
  preferred_date DATE NOT NULL,
  preferred_time TEXT NOT NULL,
  alternate_date DATE,
  alternate_time TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_showing_requests_mls ON public.showing_requests(mls_number);

-- ============================================
-- AGENT PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.agent_profiles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  photo_url TEXT,
  bio TEXT,
  title TEXT,
  specializations TEXT[] DEFAULT '{}',
  service_areas TEXT[] DEFAULT '{}',
  languages TEXT[] DEFAULT ARRAY['English'],
  social_media JSONB DEFAULT '{}',
  slug TEXT UNIQUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_agent_profiles_slug ON public.agent_profiles(slug);

-- ============================================
-- NOTIFICATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS public.notifications (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('new_listing', 'price_change', 'open_house', 'showing_confirmed', 'system')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_notifications_read ON public.notifications(user_id, read);

-- ============================================
-- PAGE VIEWS TABLE (Analytics)
-- ============================================
CREATE TABLE IF NOT EXISTS public.page_views (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  mls_number TEXT,
  page_type TEXT NOT NULL,
  user_id UUID REFERENCES public.profiles(id),
  session_id TEXT,
  referrer TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_page_views_mls ON public.page_views(mls_number);
CREATE INDEX idx_page_views_created_at ON public.page_views(created_at DESC);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.saved_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.showing_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Profiles: users can read all, update own
CREATE POLICY "Profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Favorites: users manage own
CREATE POLICY "Users can view own favorites" ON public.favorites FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own favorites" ON public.favorites FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own favorites" ON public.favorites FOR DELETE USING (auth.uid() = user_id);

-- Saved Searches: users manage own
CREATE POLICY "Users can view own saved searches" ON public.saved_searches FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own saved searches" ON public.saved_searches FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own saved searches" ON public.saved_searches FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own saved searches" ON public.saved_searches FOR DELETE USING (auth.uid() = user_id);

-- Leads: anyone can insert, agents/admins can view
CREATE POLICY "Anyone can create leads" ON public.leads FOR INSERT WITH CHECK (true);
CREATE POLICY "Agents can view leads" ON public.leads FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('agent', 'admin'))
);
CREATE POLICY "Agents can update leads" ON public.leads FOR UPDATE USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('agent', 'admin'))
);

-- Showing Requests
CREATE POLICY "Anyone can create showing requests" ON public.showing_requests FOR INSERT WITH CHECK (true);
CREATE POLICY "Agents can view showing requests" ON public.showing_requests FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('agent', 'admin'))
);

-- Agent Profiles: viewable by all
CREATE POLICY "Agent profiles are viewable by everyone" ON public.agent_profiles FOR SELECT USING (true);
CREATE POLICY "Agents can update own profile" ON public.agent_profiles FOR UPDATE USING (auth.uid() = user_id);

-- Notifications: users see own
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
