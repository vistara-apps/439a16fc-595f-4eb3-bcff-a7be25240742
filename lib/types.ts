export interface User {
  userId: string;
  walletAddress: string;
  role: 'dispatcher' | 'courier';
  reputationScore: number;
  rating: number;
  name?: string;
  avatar?: string;
}

export interface Delivery {
  deliveryId: string;
  dispatcherId: string;
  courierId?: string;
  pickupLocation: Location;
  dropoffLocation: Location;
  packageDetails: PackageDetails;
  bountyAmount: number;
  status: DeliveryStatus;
  createdAt: Date;
  updatedAt: Date;
  blockchainTxHash?: string;
  estimatedDistance?: number;
  estimatedDuration?: number;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  instructions?: string;
}

export interface PackageDetails {
  description: string;
  size: 'small' | 'medium' | 'large';
  weight?: number;
  fragile: boolean;
  urgent: boolean;
}

export type DeliveryStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface DeliveryTracking {
  trackingId: string;
  deliveryId: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  status?: string;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface DeliveryRequest {
  pickupAddress: string;
  dropoffAddress: string;
  packageDescription: string;
  packageSize: PackageDetails['size'];
  bountyAmount: number;
  urgent: boolean;
  fragile: boolean;
  instructions?: string;
}
