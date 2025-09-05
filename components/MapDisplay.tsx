'use client';

import { Location } from '@/lib/types';
import { MapPin, Navigation } from 'lucide-react';

interface MapDisplayProps {
  pickupLocation?: Location;
  dropoffLocation?: Location;
  courierLocation?: Location;
  variant?: 'static' | 'interactive';
  className?: string;
}

export function MapDisplay({ 
  pickupLocation, 
  dropoffLocation, 
  courierLocation,
  variant = 'static',
  className = '' 
}: MapDisplayProps) {
  return (
    <div className={`glass-card p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-white">Delivery Route</h3>
        {variant === 'interactive' && (
          <button className="btn-secondary text-sm py-2 px-3">
            <Navigation className="w-4 h-4 mr-1" />
            Navigate
          </button>
        )}
      </div>

      {/* Mock Map Container */}
      <div className="relative h-48 bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg overflow-hidden">
        {/* Mock map background with grid pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid grid-cols-8 grid-rows-6 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div key={i} className="border border-white border-opacity-10"></div>
            ))}
          </div>
        </div>

        {/* Pickup Location */}
        {pickupLocation && (
          <div className="absolute top-4 left-4 flex items-center space-x-2">
            <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-pulse">
              <div className="w-2 h-2 bg-white rounded-full"></div>
            </div>
            <div className="glass-surface px-2 py-1 rounded text-xs text-white">
              Pickup
            </div>
          </div>
        )}

        {/* Dropoff Location */}
        {dropoffLocation && (
          <div className="absolute bottom-4 right-4 flex items-center space-x-2">
            <div className="glass-surface px-2 py-1 rounded text-xs text-white">
              Dropoff
            </div>
            <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
              <MapPin className="w-3 h-3 text-white" />
            </div>
          </div>
        )}

        {/* Courier Location (if tracking) */}
        {courierLocation && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-pulse-slow">
              <div className="w-3 h-3 bg-white rounded-full"></div>
            </div>
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
              <div className="glass-surface px-2 py-1 rounded text-xs text-white whitespace-nowrap">
                Courier
              </div>
            </div>
          </div>
        )}

        {/* Mock route line */}
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#EC4899" stopOpacity="0.8" />
            </linearGradient>
          </defs>
          <path
            d="M 20 20 Q 100 80 180 180"
            stroke="url(#routeGradient)"
            strokeWidth="3"
            fill="none"
            strokeDasharray="5,5"
            className="animate-pulse"
          />
        </svg>
      </div>

      {/* Location Details */}
      <div className="mt-4 space-y-2">
        {pickupLocation && (
          <div className="flex items-start space-x-2">
            <div className="w-4 h-4 bg-green-500 rounded-full mt-1 flex-shrink-0"></div>
            <div>
              <p className="text-sm text-gray-300">Pickup Location</p>
              <p className="text-white text-sm">{pickupLocation.address}</p>
            </div>
          </div>
        )}
        
        {dropoffLocation && (
          <div className="flex items-start space-x-2">
            <MapPin className="w-4 h-4 text-red-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-sm text-gray-300">Dropoff Location</p>
              <p className="text-white text-sm">{dropoffLocation.address}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
