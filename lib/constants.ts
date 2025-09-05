export const DELIVERY_STATUSES = {
  PENDING: 'pending',
  IN_PROGRESS: 'in-progress',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
} as const;

export const PACKAGE_SIZES = {
  SMALL: 'small',
  MEDIUM: 'medium',
  LARGE: 'large',
} as const;

export const USER_ROLES = {
  DISPATCHER: 'dispatcher',
  COURIER: 'courier',
} as const;

export const MOCK_DELIVERIES = [
  {
    deliveryId: '1',
    dispatcherId: '0x123',
    pickupLocation: {
      address: '123 Main St, San Francisco, CA',
      latitude: 37.7749,
      longitude: -122.4194,
    },
    dropoffLocation: {
      address: '456 Oak Ave, San Francisco, CA',
      latitude: 37.7849,
      longitude: -122.4094,
    },
    packageDetails: {
      description: 'Electronics package',
      size: 'medium' as const,
      fragile: true,
      urgent: false,
    },
    bountyAmount: 0.025,
    status: 'pending' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
    estimatedDistance: 2.5,
    estimatedDuration: 15,
  },
  {
    deliveryId: '2',
    dispatcherId: '0x456',
    courierId: '0x789',
    pickupLocation: {
      address: '789 Pine St, San Francisco, CA',
      latitude: 37.7649,
      longitude: -122.4294,
    },
    dropoffLocation: {
      address: '321 Elm St, San Francisco, CA',
      latitude: 37.7949,
      longitude: -122.3994,
    },
    packageDetails: {
      description: 'Documents',
      size: 'small' as const,
      fragile: false,
      urgent: true,
    },
    bountyAmount: 0.015,
    status: 'in-progress' as const,
    createdAt: new Date(Date.now() - 3600000),
    updatedAt: new Date(),
    estimatedDistance: 1.8,
    estimatedDuration: 12,
  },
];

export const MOCK_USER = {
  userId: '1',
  walletAddress: '0x123456789',
  role: 'dispatcher' as const,
  reputationScore: 4.8,
  rating: 4.9,
  name: 'John Doe',
};
