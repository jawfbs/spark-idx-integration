'use client';

import { useState } from 'react';
import { FiBell, FiCheck } from 'react-icons/fi';
import { SearchParams } from '@/lib/types';
import { EMAIL_FREQUENCY_OPTIONS } from '@/lib/constants';
import { useAuthStore, useUIStore } from '@/store';
import Modal from '@/components/ui/Modal';
import toast from 'react-hot-toast';

interface SaveSearchButtonProps {
  params: SearchParams;
}

export default function SaveSearchButton({ params }: SaveSearchButtonProps) {
  const { user } = useAuthStore();
  const { setLoginModalOpen } = useUIStore();
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [frequency, setFrequency] = useState('daily');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!user) {
      setLoginModalOpen(true);
      return;
    }

    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const res = await fetch('/api/saved-searches', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name || 'My Search',
          params,
          emailAlerts,
          frequency,
        }),
      });

      if (res.ok) {
        toast.success('Search saved!');
        setShowModal(false);
        setName('');
      } else {
        toast.error('Failed to save search');
      }
    } catch {
      toast.error('Failed to save search');
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      <button onClick={handleSave} className="btn-secondary flex items-center gap-2">
        <FiBell className="w-4 h-4" />
        Save Search
      </button>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)} title="Save Search" size="sm">
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="label">Search Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Downtown 3 bed condos"
              className="input"
              required
            />
          </div>

          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />
              <span className="text-sm text-gray-700">Email me when new listings match</span>
            </label>
          </div>

          {emailAlerts && (
            <div>
              <label className="label">Notification Frequency</label>
              <select
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
                className="input"
              >
                {EMAIL_FREQUENCY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="btn-primary w-full"
          >
            {saving ? 'Saving...' : 'Save Search'}
          </button>
        </form>
      </Modal>
    </>
  );
}
