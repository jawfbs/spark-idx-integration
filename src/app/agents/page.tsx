import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';
import Link from 'next/link';

export const revalidate = 3600;

// In production, fetch from Supabase
const agents = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Senior Agent',
    email: 'sarah@sparkidx.com',
    phone: '(555) 123-4567',
    photo: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    bio: 'Over 15 years of experience helping families find their dream homes.',
    specializations: ['Residential', 'Luxury'],
    serviceAreas: ['Toronto', 'Mississauga'],
    slug: 'sarah-johnson',
  },
  {
    id: '2',
    name: 'Michael Chen',
    title: 'Broker',
    email: 'michael@sparkidx.com',
    phone: '(555) 987-6543',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    bio: 'Specializing in investment properties and new developments.',
    specializations: ['Commercial', 'Investment'],
    serviceAreas: ['Toronto', 'North York'],
    slug: 'michael-chen',
  },
];

export default function AgentsPage() {
  return (
    <div className="container-custom py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Our Agents</h1>
        <p className="text-gray-500 mt-1">Expert agents ready to help you.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agents.map((agent) => (
          <Link key={agent.id} href={`/agents/${agent.slug}`} className="card group">
            <div className="p-6 text-center">
              <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                <img src={agent.photo} alt={agent.name} className="w-full h-full object-cover" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{agent.name}</h3>
              <p className="text-sm text-brand-600 mb-2">{agent.title}</p>
              <p className="text-sm text-gray-500 mb-4">{agent.bio}</p>

              <div className="flex flex-wrap justify-center gap-2 mb-4">
                {agent.specializations.map((s) => (
                  <span key={s} className="badge-blue">{s}</span>
                ))}
              </div>

              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center justify-center gap-2">
                  <FiPhone className="w-4 h-4" />
                  {agent.phone}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <FiMail className="w-4 h-4" />
                  {agent.email}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <FiMapPin className="w-4 h-4" />
                  {agent.serviceAreas.join(', ')}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
