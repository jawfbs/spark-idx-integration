import MortgageCalculator from '@/components/listing/MortgageCalculator';

export const metadata = {
  title: 'Mortgage Calculator',
  description: 'Calculate your monthly mortgage payment, including principal, interest, taxes, and insurance.',
};

export default function MortgageCalculatorPage() {
  return (
    <div className="container-custom py-8">
      <div className="max-w-xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Mortgage Calculator</h1>
        <p className="text-gray-500 mb-8">
          Estimate your monthly payment based on home price, down payment, and interest rate.
        </p>
        <MortgageCalculator listPrice={500000} />
      </div>
    </div>
  );
}
