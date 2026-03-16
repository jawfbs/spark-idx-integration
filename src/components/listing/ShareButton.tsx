'use client';

import { useState } from 'react';
import { FiShare2, FiLink, FiMail, FiCheck } from 'react-icons/fi';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import { generateShareUrl } from '@/lib/utils';

interface ShareButtonProps {
  mlsNumber: string;
  address: string;
}

export default function ShareButton({ mlsNumber, address }: ShareButtonProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const url = `${process.env.NEXT_PUBLIC_SITE_URL || ''}/listing/${mlsNumber}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const shareOptions = [
    {
      label: 'Copy Link',
      icon: copied ? <FiCheck className="w-4 h-4 text-green-600" /> : <FiLink className="w-4 h-4" />,
      onClick: copyLink,
    },
    {
      label: 'Email',
      icon: <FiMail className="w-4 h-4" />,
      onClick: () => window.open(generateShareUrl(mlsNumber, 'email')),
    },
    {
      label: 'Facebook',
      icon: <FaFacebook className="w-4 h-4 text-blue-600" />,
      onClick: () => window.open(generateShareUrl(mlsNumber, 'facebook'), '_blank'),
    },
    {
      label: 'Twitter',
      icon: <FaTwitter className="w-4 h-4 text-sky-500" />,
      onClick: () => window.open(generateShareUrl(mlsNumber, 'twitter'), '_blank'),
    },
    {
      label: 'LinkedIn',
      icon: <FaLinkedin className="w-4 h-4 text-blue-700" />,
      onClick: () => window.open(generateShareUrl(mlsNumber, 'linkedin'), '_blank'),
    },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setShowMenu(!showMenu)}
        className="btn-secondary flex items-center gap-2"
      >
        <FiShare2 className="w-4 h-4" />
        Share
      </button>

      {showMenu && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setShowMenu(false)} />
          <div className="absolute right-0 top-12 z-50 bg-white rounded-xl shadow-xl border border-gray-200 py-2 w-48 animate-slide-down">
            {shareOptions.map((option) => (
              <button
                key={option.label}
                onClick={() => {
                  option.onClick();
                  if (option.label !== 'Copy Link') setShowMenu(false);
                }}
                className="flex items-center gap-3 w-full px-4 py-2.5 hover:bg-gray-50 text-sm text-gray-700 transition-colors"
              >
                {option.icon}
                {option.label === 'Copy Link' && copied ? 'Copied!' : option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
