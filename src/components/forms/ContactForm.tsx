'use client';

import { useState } from 'react';
import { FiSend, FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';

interface ContactFormProps {
  mlsNumber?: string;
  agentName?: string;
  listingAddress?: string;
}

export default function ContactForm({ mlsNumber, agentName, listingAddress }: ContactFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: mlsNumber
      ? `I'm interested in the property at ${listingAddress || `MLS# ${mlsNumber}`}. Please send me more information.`
      : '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          mlsNumber,
          source: 'contact_form',
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        toast.success('Message sent! An agent will contact you soon.');
      } else {
        toast.error('Failed to send message. Please try again.');
      }
    } catch {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiCheck className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Message Sent!</h3>
        <p className="text-gray-500">We&apos;ll get back to you as soon as possible.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-1">
        {agentName ? `Contact ${agentName}` : 'Contact Agent'}
      </h3>
      <p className="text-sm text-gray-500 mb-4">
        Get more information about this property
      </p>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Your Name *"
            required
            className="input"
          />
        </div>

        <div>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            placeholder="Your Email *"
            required
            className="input"
          />
        </div>

        <div>
          <input
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            placeholder="Your Phone"
            className="input"
          />
        </div>

        <div>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            placeholder="Your Message"
            rows={4}
            className="input resize-none"
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary w-full flex items-center justify-center gap-2"
        >
          {submitting ? (
            'Sending...'
          ) : (
            <>
              <FiSend className="w-4 h-4" />
              Send Message
            </>
          )}
        </button>

        <p className="text-xs text-gray-400 text-center">
          By submitting, you agree to our Terms of Service and Privacy Policy.
        </p>
      </form>
    </div>
  );
}
