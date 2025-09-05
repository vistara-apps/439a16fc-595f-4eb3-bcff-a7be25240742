'use client';

import { TrendingUp, Package, Clock, Star } from 'lucide-react';

interface DeliveryStatsProps {
  totalDeliveries?: number;
  activeDeliveries?: number;
  completedDeliveries?: number;
  averageRating?: number;
  totalEarnings?: number;
}

export function DeliveryStats({
  totalDeliveries = 0,
  activeDeliveries = 0,
  completedDeliveries = 0,
  averageRating = 0,
  totalEarnings = 0,
}: DeliveryStatsProps) {
  const stats = [
    {
      label: 'Total Deliveries',
      value: totalDeliveries.toString(),
      icon: Package,
      color: 'text-purple-400',
      bgColor: 'from-purple-500 to-purple-600',
    },
    {
      label: 'Active',
      value: activeDeliveries.toString(),
      icon: Clock,
      color: 'text-blue-400',
      bgColor: 'from-blue-500 to-blue-600',
    },
    {
      label: 'Completed',
      value: completedDeliveries.toString(),
      icon: TrendingUp,
      color: 'text-green-400',
      bgColor: 'from-green-500 to-green-600',
    },
    {
      label: 'Rating',
      value: averageRating.toFixed(1),
      icon: Star,
      color: 'text-yellow-400',
      bgColor: 'from-yellow-500 to-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="metric-card">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 bg-gradient-to-r ${stat.bgColor} rounded-lg flex items-center justify-center`}>
              <stat.icon className="w-4 h-4 text-white" />
            </div>
            <span className={`text-2xl font-bold ${stat.color}`}>
              {stat.value}
            </span>
          </div>
          <p className="text-sm text-gray-300">{stat.label}</p>
        </div>
      ))}
      
      {totalEarnings > 0 && (
        <div className="metric-card col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-300">Total Earnings</p>
              <p className="text-2xl font-bold text-gradient">
                {totalEarnings.toFixed(3)} ETH
              </p>
            </div>
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
