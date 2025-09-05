'use client';

import { useState } from 'react';
import { DeliveryRequest } from '@/lib/types';
import { calculateBountyRecommendation } from '@/lib/utils';
import { MapPin, Package, DollarSign, AlertTriangle } from 'lucide-react';

interface CreateDeliveryFormProps {
  onSubmit: (request: DeliveryRequest) => void;
  onCancel: () => void;
}

export function CreateDeliveryForm({ onSubmit, onCancel }: CreateDeliveryFormProps) {
  const [formData, setFormData] = useState<DeliveryRequest>({
    pickupAddress: '',
    dropoffAddress: '',
    packageDescription: '',
    packageSize: 'medium',
    bountyAmount: 0.025,
    urgent: false,
    fragile: false,
    instructions: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof DeliveryRequest, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Auto-calculate bounty recommendation when relevant fields change
    if (['urgent', 'fragile'].includes(field)) {
      const estimatedDistance = 2.5; // Mock distance for demo
      const recommendedBounty = calculateBountyRecommendation(
        estimatedDistance,
        field === 'urgent' ? value : formData.urgent,
        field === 'fragile' ? value : formData.fragile
      );
      setFormData(prev => ({ ...prev, bountyAmount: recommendedBounty }));
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gradient">Create Delivery Request</h2>
        <button
          onClick={onCancel}
          className="text-gray-400 hover:text-white transition-colors duration-200"
        >
          ✕
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Locations */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
              <div className="w-4 h-4 bg-green-500 rounded-full"></div>
              <span>Pickup Address</span>
            </label>
            <input
              type="text"
              value={formData.pickupAddress}
              onChange={(e) => handleInputChange('pickupAddress', e.target.value)}
              placeholder="Enter pickup location"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
              <MapPin className="w-4 h-4 text-red-500" />
              <span>Dropoff Address</span>
            </label>
            <input
              type="text"
              value={formData.dropoffAddress}
              onChange={(e) => handleInputChange('dropoffAddress', e.target.value)}
              placeholder="Enter dropoff location"
              className="input-field"
              required
            />
          </div>
        </div>

        {/* Package Details */}
        <div className="space-y-4">
          <div>
            <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
              <Package className="w-4 h-4 text-purple-400" />
              <span>Package Description</span>
            </label>
            <input
              type="text"
              value={formData.packageDescription}
              onChange={(e) => handleInputChange('packageDescription', e.target.value)}
              placeholder="What are you sending?"
              className="input-field"
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-300 mb-2 block">Package Size</label>
            <div className="grid grid-cols-3 gap-3">
              {(['small', 'medium', 'large'] as const).map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => handleInputChange('packageSize', size)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    formData.packageSize === size
                      ? 'border-purple-500 bg-purple-500 bg-opacity-20 text-purple-300'
                      : 'border-gray-600 glass-surface text-gray-300 hover:border-gray-500'
                  }`}
                >
                  <div className="text-center">
                    <Package className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-sm capitalize">{size}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Special Requirements */}
        <div className="space-y-3">
          <label className="text-sm font-medium text-gray-300">Special Requirements</label>
          
          <div className="flex items-center space-x-3">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => handleInputChange('urgent', e.target.checked)}
                className="w-4 h-4 text-purple-500 bg-transparent border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-300">Urgent Delivery</span>
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.fragile}
                onChange={(e) => handleInputChange('fragile', e.target.checked)}
                className="w-4 h-4 text-purple-500 bg-transparent border-gray-600 rounded focus:ring-purple-500"
              />
              <span className="text-sm text-gray-300">Fragile Item</span>
            </label>
          </div>
        </div>

        {/* Bounty Amount */}
        <div>
          <label className="flex items-center space-x-2 text-sm font-medium text-gray-300 mb-2">
            <DollarSign className="w-4 h-4 text-green-400" />
            <span>Bounty Amount (ETH)</span>
          </label>
          <input
            type="number"
            step="0.001"
            min="0.001"
            value={formData.bountyAmount}
            onChange={(e) => handleInputChange('bountyAmount', parseFloat(e.target.value))}
            className="input-field"
            required
          />
          <p className="text-xs text-gray-400 mt-1">
            Recommended: {calculateBountyRecommendation(2.5, formData.urgent, formData.fragile).toFixed(3)} ETH
          </p>
        </div>

        {/* Special Instructions */}
        <div>
          <label className="text-sm font-medium text-gray-300 mb-2 block">
            Special Instructions (Optional)
          </label>
          <textarea
            value={formData.instructions}
            onChange={(e) => handleInputChange('instructions', e.target.value)}
            placeholder="Any special delivery instructions..."
            rows={3}
            className="input-field resize-none"
          />
        </div>

        {/* Warning */}
        <div className="glass-surface p-4 rounded-lg border border-yellow-500 border-opacity-30">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-yellow-300 font-medium">Smart Contract Escrow</p>
              <p className="text-xs text-gray-300 mt-1">
                Your bounty will be locked in a smart contract until delivery is confirmed. 
                This ensures secure payment to the courier.
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="btn-outline flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-primary flex-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Post Delivery Bounty'}
          </button>
        </div>
      </form>
    </div>
  );
}
