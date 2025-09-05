'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { DeliveryCard } from '@/components/DeliveryCard';
import { CreateDeliveryForm } from '@/components/CreateDeliveryForm';
import { DeliveryStats } from '@/components/DeliveryStats';
import { MapDisplay } from '@/components/MapDisplay';
import { MOCK_DELIVERIES, MOCK_USER } from '@/lib/constants';
import { Delivery, DeliveryRequest, User } from '@/lib/types';
import { Plus, Filter, MapPin, Package, User as UserIcon } from 'lucide-react';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [deliveries, setDeliveries] = useState<Delivery[]>(MOCK_DELIVERIES);
  const [user] = useState<User>(MOCK_USER);
  const [activeTab, setActiveTab] = useState<'deliveries' | 'create' | 'profile'>('deliveries');
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [selectedDelivery, setSelectedDelivery] = useState<Delivery | null>(null);
  const [userRole, setUserRole] = useState<'dispatcher' | 'courier'>('dispatcher');

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleCreateDelivery = async (request: DeliveryRequest) => {
    // Mock delivery creation
    const newDelivery: Delivery = {
      deliveryId: (deliveries.length + 1).toString(),
      dispatcherId: user.userId,
      pickupLocation: {
        address: request.pickupAddress,
        latitude: 37.7749 + Math.random() * 0.01,
        longitude: -122.4194 + Math.random() * 0.01,
      },
      dropoffLocation: {
        address: request.dropoffAddress,
        latitude: 37.7849 + Math.random() * 0.01,
        longitude: -122.4094 + Math.random() * 0.01,
      },
      packageDetails: {
        description: request.packageDescription,
        size: request.packageSize,
        fragile: request.fragile,
        urgent: request.urgent,
      },
      bountyAmount: request.bountyAmount,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
      estimatedDistance: 2.5,
      estimatedDuration: 15,
    };

    setDeliveries(prev => [newDelivery, ...prev]);
    setShowCreateForm(false);
    
    // Mock blockchain transaction
    console.log('Creating delivery bounty on Base network...', newDelivery);
  };

  const handleAcceptDelivery = async (deliveryId: string) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.deliveryId === deliveryId 
        ? { ...delivery, courierId: user.userId, status: 'in-progress' as const, updatedAt: new Date() }
        : delivery
    ));
    
    console.log('Accepting delivery:', deliveryId);
  };

  const handleCompleteDelivery = async (deliveryId: string) => {
    setDeliveries(prev => prev.map(delivery => 
      delivery.deliveryId === deliveryId 
        ? { ...delivery, status: 'completed' as const, updatedAt: new Date() }
        : delivery
    ));
    
    console.log('Completing delivery:', deliveryId);
  };

  const handleTrackDelivery = (deliveryId: string) => {
    const delivery = deliveries.find(d => d.deliveryId === deliveryId);
    setSelectedDelivery(delivery || null);
  };

  const filteredDeliveries = deliveries.filter(delivery => {
    if (userRole === 'dispatcher') {
      return delivery.dispatcherId === user.userId;
    } else {
      return delivery.status === 'pending' || delivery.courierId === user.userId;
    }
  });

  const stats = {
    totalDeliveries: filteredDeliveries.length,
    activeDeliveries: filteredDeliveries.filter(d => d.status === 'in-progress').length,
    completedDeliveries: filteredDeliveries.filter(d => d.status === 'completed').length,
    averageRating: user.rating,
    totalEarnings: userRole === 'courier' ? 0.125 : 0,
  };

  if (showCreateForm) {
    return (
      <AppShell title="Create Delivery">
        <CreateDeliveryForm
          onSubmit={handleCreateDelivery}
          onCancel={() => setShowCreateForm(false)}
        />
      </AppShell>
    );
  }

  if (selectedDelivery) {
    return (
      <AppShell title="Track Delivery">
        <div className="space-y-6">
          <button
            onClick={() => setSelectedDelivery(null)}
            className="btn-outline"
          >
            ← Back to Deliveries
          </button>
          
          <MapDisplay
            pickupLocation={selectedDelivery.pickupLocation}
            dropoffLocation={selectedDelivery.dropoffLocation}
            courierLocation={{
              address: 'Current Location',
              latitude: 37.7799,
              longitude: -122.4144,
            }}
            variant="interactive"
          />
          
          <DeliveryCard
            delivery={selectedDelivery}
            variant={userRole === 'dispatcher' ? 'dispatching' : 'courier'}
            onComplete={handleCompleteDelivery}
          />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Role Toggle */}
        <div className="glass-card p-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Dashboard</h2>
            <div className="flex bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setUserRole('dispatcher')}
                className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                  userRole === 'dispatcher'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Dispatcher
              </button>
              <button
                onClick={() => setUserRole('courier')}
                className={`px-3 py-1 rounded-md text-sm transition-all duration-200 ${
                  userRole === 'courier'
                    ? 'bg-purple-500 text-white'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Courier
              </button>
            </div>
          </div>
          
          <DeliveryStats {...stats} />
        </div>

        {/* Quick Actions */}
        <div className="flex space-x-3">
          {userRole === 'dispatcher' && (
            <button
              onClick={() => setShowCreateForm(true)}
              className="btn-primary flex-1 flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Create Delivery</span>
            </button>
          )}
          
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter</span>
          </button>
        </div>

        {/* Deliveries List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-white">
              {userRole === 'dispatcher' ? 'My Deliveries' : 'Available Deliveries'}
            </h3>
            <span className="text-sm text-gray-300">
              {filteredDeliveries.length} deliveries
            </span>
          </div>

          {filteredDeliveries.length === 0 ? (
            <div className="glass-card p-8 text-center">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">
                {userRole === 'dispatcher' ? 'No deliveries yet' : 'No available deliveries'}
              </h3>
              <p className="text-gray-300 mb-4">
                {userRole === 'dispatcher' 
                  ? 'Create your first delivery request to get started.'
                  : 'Check back later for new delivery opportunities.'
                }
              </p>
              {userRole === 'dispatcher' && (
                <button
                  onClick={() => setShowCreateForm(true)}
                  className="btn-primary"
                >
                  Create Delivery
                </button>
              )}
            </div>
          ) : (
            filteredDeliveries.map((delivery) => (
              <DeliveryCard
                key={delivery.deliveryId}
                delivery={delivery}
                variant={userRole === 'dispatcher' ? 'dispatching' : 'courier'}
                onAccept={handleAcceptDelivery}
                onTrack={handleTrackDelivery}
                onComplete={handleCompleteDelivery}
              />
            ))
          )}
        </div>

        {/* Bottom spacing for navigation */}
        <div className="h-20"></div>
      </div>
    </AppShell>
  );
}
