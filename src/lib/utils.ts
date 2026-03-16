import { type ClassValue, clsx } from 'clsx';

// Simple classname merge (no clsx dependency needed - inline implementation)
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export function formatPrice(price: number): string {
  if (price >= 1000000) {
    return `$${(price / 1000000).toFixed(price % 1000000 === 0 ? 0 : 1)}M`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatPriceFull(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('en-US').format(num);
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function formatRelativeDate(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  return `${Math.floor(diffDays / 365)} years ago`;
}

export function formatAddress(address: {
  streetNumber?: string;
  streetName?: string;
  streetSuffix?: string;
  unitNumber?: string;
  city?: string;
  state?: string;
  zip?: string;
}): string {
  const parts = [
    address.unitNumber ? `${address.unitNumber} -` : '',
    address.streetNumber,
    address.streetName,
    address.streetSuffix,
  ].filter(Boolean);

  const street = parts.join(' ');
  const cityState = [address.city, address.state].filter(Boolean).join(', ');

  return `${street}, ${cityState} ${address.zip || ''}`.trim();
}

export function formatAddressShort(address: {
  streetNumber?: string;
  streetName?: string;
  streetSuffix?: string;
  unitNumber?: string;
}): string {
  const parts = [
    address.unitNumber ? `${address.unitNumber} -` : '',
    address.streetNumber,
    address.streetName,
    address.streetSuffix,
  ].filter(Boolean);

  return parts.join(' ');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function deslugify(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function calculateMortgage(
  principal: number,
  annualRate: number,
  years: number,
  downPaymentPercent: number = 20
): {
  monthlyPayment: number;
  downPayment: number;
  loanAmount: number;
  totalInterest: number;
  totalPayment: number;
} {
  const downPayment = principal * (downPaymentPercent / 100);
  const loanAmount = principal - downPayment;
  const monthlyRate = annualRate / 100 / 12;
  const numPayments = years * 12;

  if (monthlyRate === 0) {
    return {
      monthlyPayment: loanAmount / numPayments,
      downPayment,
      loanAmount,
      totalInterest: 0,
      totalPayment: loanAmount,
    };
  }

  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, numPayments))) /
    (Math.pow(1 + monthlyRate, numPayments) - 1);

  const totalPayment = monthlyPayment * numPayments;
  const totalInterest = totalPayment - loanAmount;

  return {
    monthlyPayment,
    downPayment,
    loanAmount,
    totalInterest,
    totalPayment,
  };
}

export function getListingUrl(mlsNumber: string): string {
  return `/listing/${mlsNumber}`;
}

export function getNeighborhoodUrl(city: string, neighborhood?: string): string {
  const citySlug = slugify(city);
  if (neighborhood) {
    return `/neighborhoods/${citySlug}/${slugify(neighborhood)}`;
  }
  return `/neighborhoods/${citySlug}`;
}

export function getSearchUrl(params: Record<string, string>): string {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value) searchParams.set(key, value);
  });
  return `/search?${searchParams.toString()}`;
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + '...';
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateShareUrl(mlsNumber: string, platform: string): string {
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/listing/${mlsNumber}`;
  const text = 'Check out this listing!';

  switch (platform) {
    case 'facebook':
      return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    case 'twitter':
      return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
    case 'linkedin':
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    case 'email':
      return `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
    default:
      return url;
  }
}
