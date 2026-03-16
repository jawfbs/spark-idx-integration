'use client';

import { useState, useMemo } from 'react';
import { formatPriceFull } from '@/lib/utils';
import { calculateMortgage } from '@/lib/utils';

interface MortgageCalculatorProps {
  listPrice: number;
}

export default function MortgageCalculator({ listPrice }: MortgageCalculatorProps) {
  const [homePrice, setHomePrice] = useState(listPrice);
  const [downPaymentPercent, setDownPaymentPercent] = useState(20);
  const [interestRate, setInterestRate] = useState(6.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(Math.round(listPrice * 0.012 / 12));
  const [insurance, setInsurance] = useState(150);
  const [hoa, setHoa] = useState(0);

  const mortgage = useMemo(
    () => calculateMortgage(homePrice, interestRate, loanTerm, downPaymentPercent),
    [homePrice, interestRate, loanTerm, downPaymentPercent]
  );

  const totalMonthly = mortgage.monthlyPayment + propertyTax + insurance + hoa;

  // Pie chart segments
  const segments = [
    { label: 'Principal & Interest', amount: mortgage.monthlyPayment, color: '#2563eb' },
    { label: 'Property Tax', amount: propertyTax, color: '#059669' },
    { label: 'Insurance', amount: insurance, color: '#d97706' },
    ...(hoa > 0 ? [{ label: 'HOA', amount: hoa, color: '#7c3aed' }] : []),
  ];

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Mortgage Calculator</h3>

      {/* Monthly Payment Display */}
      <div className="text-center mb-6 p-4 bg-brand-50 rounded-xl">
        <p className="text-sm text-gray-600 mb-1">Estimated Monthly Payment</p>
        <p className="text-3xl font-bold text-brand-700">
          {formatPriceFull(Math.round(totalMonthly))}
        </p>
      </div>

      {/* Breakdown */}
      <div className="space-y-2 mb-6">
        {segments.map((seg) => (
          <div key={seg.label} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: seg.color }} />
              <span className="text-gray-600">{seg.label}</span>
            </div>
            <span className="font-medium">{formatPriceFull(Math.round(seg.amount))}</span>
          </div>
        ))}
      </div>

      {/* Inputs */}
      <div className="space-y-4">
        <div>
          <label className="label">Home Price</label>
          <input
            type="number"
            value={homePrice}
            onChange={(e) => setHomePrice(Number(e.target.value))}
            className="input"
          />
        </div>

        <div>
          <label className="label">Down Payment ({downPaymentPercent}%)</label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min="0"
              max="50"
              value={downPaymentPercent}
              onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
              className="flex-1"
            />
            <span className="text-sm font-medium text-gray-700 w-24 text-right">
              {formatPriceFull(mortgage.downPayment)}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="label">Interest Rate (%)</label>
            <input
              type="number"
              step="0.1"
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="label">Loan Term</label>
            <select
              value={loanTerm}
              onChange={(e) => setLoanTerm(Number(e.target.value))}
              className="input"
            >
              <option value={30}>30 years</option>
              <option value={20}>20 years</option>
              <option value={15}>15 years</option>
              <option value={10}>10 years</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="label">Tax/mo</label>
            <input
              type="number"
              value={propertyTax}
              onChange={(e) => setPropertyTax(Number(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="label">Insurance/mo</label>
            <input
              type="number"
              value={insurance}
              onChange={(e) => setInsurance(Number(e.target.value))}
              className="input"
            />
          </div>
          <div>
            <label className="label">HOA/mo</label>
            <input
              type="number"
              value={hoa}
              onChange={(e) => setHoa(Number(e.target.value))}
              className="input"
            />
          </div>
        </div>
      </div>

      {/* Loan Summary */}
      <div className="mt-6 pt-4 border-t border-gray-200 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Loan Amount</span>
          <span className="font-medium">{formatPriceFull(mortgage.loanAmount)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Interest</span>
          <span className="font-medium">{formatPriceFull(Math.round(mortgage.totalInterest))}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Total Payment</span>
          <span className="font-medium">{formatPriceFull(Math.round(mortgage.totalPayment + mortgage.downPayment))}</span>
        </div>
      </div>
    </div>
  );
}
