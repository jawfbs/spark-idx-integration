'use client';

import { useState } from 'react';
import { FiCalendar, FiCheck, FiClock } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ShowingRequestFormProps {
  mlsNumber: string;
  listingAddress: string;
}

export default function ShowingRequestForm({ mlsNumber, listingAddress }: ShowingRequestFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    preferredDate: '',
    preferredTime: '',
    alternateDate: '',
    alternateTime: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/showings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mlsNumber,
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success('Showing request submitted!');
      } else {
        toast.error('Failed to submit request.');
      }
    } catch {
      toast.error('Failed to submit request.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold mb-2">Request Submitted!</h3>
        <p className="text-gray-500">We&apos;ll confirm your showing time shortly.</p>
      </div>
    );
  }

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM',
  ];

  // Minimum date is tomorrow
  const minDate = new Date();
  minDate.setDate(minDate.getDate() + 1);
  const minDateStr = minDate.toISOString().split('T')[0];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-gray-50 rounded-lg p-3 mb-4">
        <p className="text-sm text-gray-600">Schedule a showing for:</p>
        <p className="font-medium text-gray-900">{listingAddress}</p>
        <p className="text-xs text-gray-500">MLS# {mlsNumber}</p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Your Name *</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label">Phone</label>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="input"
          />
        </div>
      </div>

      <div>
        <label className="label">Email *</label>
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="input"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label flex items-center gap-1">
            <FiCalendar className="w-3.5 h-3.5" /> Preferred Date *
          </label>
          <input
            type="date"
            value={formData.preferredDate}
            onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
            min={minDateStr}
            required
            className="input"
          />
        </div>
        <div>
          <label className="label flex items-center gap-1">
            <FiClock className="w-3.5 h-3.5" /> Preferred Time *
          </label>
          <select
            value={formData.preferredTime}
            onChange={(e) => setFormData({ ...formData, preferredTime: e.target.value })}
            required
            className="input"
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="label">Alternate Date</label>
          <input
            type="date"
            value={formData.alternateDate}
            onChange={(e) => setFormData({ ...formData, alternateDate: e.target.value })}
            min={minDateStr}
            className="input"
          />
        </div>
        <div>
          <label className="label">Alternate Time</label>
          <select
            value={formData.alternateTime}
            onChange={(e) => setFormData({ ...formData, alternateTime: e.target.value })}
            className="input"
          >
            <option value="">Select time</option>
            {timeSlots.map((slot) => (
              <option key={slot} value={slot}>{slot}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="label">Additional Notes</label>
        <textarea
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          rows={3}
          placeholder="Any special requests or questions..."
          className="input resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="btn-primary w-full"
      >
        {submitting ? 'Submitting...' : 'Request Showing'}
      </button>
    </form>
  );
}
