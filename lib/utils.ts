import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwindcss-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatAddress(address: string): string {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export function formatBounty(amount: number): string {
  return `${amount.toFixed(3)} ETH`;
}

export function formatDistance(distance: number): string {
  return `${distance.toFixed(1)} km`;
}

export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} min`;
  }
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'pending':
      return 'status-pending';
    case 'in-progress':
      return 'status-in-progress';
    case 'completed':
      return 'status-completed';
    case 'cancelled':
      return 'status-cancelled';
    default:
      return 'status-pending';
  }
}

export function calculateBountyRecommendation(
  distance: number,
  urgent: boolean,
  fragile: boolean
): number {
  let baseBounty = 0.01; // Base 0.01 ETH
  baseBounty += distance * 0.005; // 0.005 ETH per km
  
  if (urgent) baseBounty *= 1.5;
  if (fragile) baseBounty *= 1.2;
  
  return Math.round(baseBounty * 1000) / 1000; // Round to 3 decimal places
}
