'use client';

import { DeliveryStatus } from '@/lib/types';
import { getStatusColor } from '@/lib/utils';
import { Clock, Truck, CheckCircle, XCircle } from 'lucide-react';

interface StatusIndicatorProps {
  status: DeliveryStatus;
  variant?: 'pending' | 'in_progress' | 'completed' | 'cancelled';
}

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const getStatusIcon = (status: DeliveryStatus) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-3 h-3" />;
      case 'in-progress':
        return <Truck className="w-3 h-3" />;
      case 'completed':
        return <CheckCircle className="w-3 h-3" />;
      case 'cancelled':
        return <XCircle className="w-3 h-3" />;
      default:
        return <Clock className="w-3 h-3" />;
    }
  };

  const getStatusText = (status: DeliveryStatus) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'in-progress':
        return 'In Progress';
      case 'completed':
        return 'Completed';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  return (
    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(status)}`}>
      {getStatusIcon(status)}
      <span>{getStatusText(status)}</span>
    </div>
  );
}
