'use client';

import { FiSearch, FiHome, FiHeart, FiBell } from 'react-icons/fi';

interface EmptyStateProps {
  icon?: 'search' | 'home' | 'heart' | 'bell';
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const icons = {
  search: FiSearch,
  home: FiHome,
  heart: FiHeart,
  bell: FiBell,
};

export default function EmptyState({ icon = 'search', title, description, action }: EmptyStateProps) {
  const Icon = icons[icon];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Icon className="w-8 h-8 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      {description && <p className="text-gray-500 max-w-md mb-6">{description}</p>}
      {action && (
        <button onClick={action.onClick} className="btn-primary">
          {action.label}
        </button>
      )}
    </div>
  );
}
