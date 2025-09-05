'use client';

import { Delivery } from '@/lib/types';
import { formatBounty, formatDistance, formatDuration, getStatusColor } from '@/lib/utils';
import { MapPin, Clock, Package, User, Star } from 'lucide-react';
import { StatusIndicator } from './StatusIndicator';

interface DeliveryCardProps {
  delivery: Delivery;
  variant?: 'dispatching' | 'courier';
  onAccept?: (deliveryId: string) => void;
  onTrack?: (deliveryId: string) => void;
  onComplete?: (deliveryId: string) => void;
}

export function DeliveryCard({ 
  delivery, 
  variant = 'dispatching',
  onAccept,
  onTrack,
  onComplete 
}: DeliveryCardProps) {
  const isDispatcher = variant === 'dispatching';
  const canAccept = !isDispatcher && delivery.status === 'pending' && !delivery.courierId;
  const canComplete = !isDispatcher && delivery.status === 'in-progress' && delivery.courierId;
  const canTrack = delivery.status === 'in-progress';

  return (
    <div className="glass-card p-6 hover:bg-opacity-15 transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Package className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{delivery.packageDetails.description}</h3>
            <p className="text-sm text-gray-300">ID: {delivery.deliveryId}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-2xl font-bold text-gradient">
            {formatBounty(delivery.bountyAmount)}
          </div>
          <StatusIndicator status={delivery.status} />
        </div>
      </div>

      {/* Package Details */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="glass-surface p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Package className="w-4 h-4 text-purple-400" />
            <span className="text-sm text-gray-300">Package</span>
          </div>
          <p className="text-white font-medium capitalize">{delivery.packageDetails.size}</p>
          <div className="flex space-x-2 mt-1">
            {delivery.packageDetails.fragile && (
              <span className="text-xs bg-red-500 bg-opacity-20 text-red-300 px-2 py-1 rounded">
                Fragile
              </span>
            )}
            {delivery.packageDetails.urgent && (
              <span className="text-xs bg-yellow-500 bg-opacity-20 text-yellow-300 px-2 py-1 rounded">
                Urgent
              </span>
            )}
          </div>
        </div>

        <div className="glass-surface p-3 rounded-lg">
          <div className="flex items-center space-x-2 mb-1">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-sm text-gray-300">Estimate</span>
          </div>
          <p className="text-white font-medium">
            {delivery.estimatedDistance && formatDistance(delivery.estimatedDistance)}
          </p>
          <p className="text-sm text-gray-300">
            {delivery.estimatedDuration && formatDuration(delivery.estimatedDuration)}
          </p>
        </div>
      </div>

      {/* Locations */}
      <div className="space-y-3 mb-4">
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center mt-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <div>
            <p className="text-sm text-gray-300">Pickup</p>
            <p className="text-white font-medium">{delivery.pickupLocation.address}</p>
          </div>
        </div>
        
        <div className="flex items-start space-x-3">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center mt-1">
            <MapPin className="w-3 h-3 text-white" />
          </div>
          <div>
            <p className="text-sm text-gray-300">Dropoff</p>
            <p className="text-white font-medium">{delivery.dropoffLocation.address}</p>
          </div>
        </div>
      </div>

      {/* Courier Info (if assigned) */}
      {delivery.courierId && (
        <div className="glass-surface p-3 rounded-lg mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-white font-medium">Courier Assigned</p>
              <div className="flex items-center space-x-1">
                <Star className="w-3 h-3 text-yellow-400 fill-current" />
                <span className="text-sm text-gray-300">4.8 rating</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex space-x-3">
        {canAccept && (
          <button
            onClick={() => onAccept?.(delivery.deliveryId)}
            className="btn-primary flex-1"
          >
            Accept Delivery
          </button>
        )}
        
        {canTrack && (
          <button
            onClick={() => onTrack?.(delivery.deliveryId)}
            className="btn-secondary flex-1"
          >
            Track Delivery
          </button>
        )}
        
        {canComplete && (
          <button
            onClick={() => onComplete?.(delivery.deliveryId)}
            className="btn-primary flex-1"
          >
            Mark Delivered
          </button>
        )}
        
        {isDispatcher && delivery.status === 'pending' && (
          <button className="btn-outline flex-1">
            Edit Request
          </button>
        )}
      </div>
    </div>
  );
}
