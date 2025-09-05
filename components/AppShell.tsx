'use client';

import { ReactNode } from 'react';
import { Package, User, MapPin, Bell } from 'lucide-react';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';

interface AppShellProps {
  children: ReactNode;
  title?: string;
}

export function AppShell({ children, title = 'ShipnEarn' }: AppShellProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      {/* Header */}
      <header className="glass-card mx-4 mt-4 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gradient">{title}</h1>
              <p className="text-sm text-gray-300">Decentralized Delivery</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <button className="p-2 glass-surface rounded-lg hover:bg-opacity-15 transition-all duration-200">
              <Bell className="w-5 h-5 text-gray-300" />
            </button>
            
            <Wallet>
              <ConnectWallet>
                <div className="flex items-center space-x-2 glass-surface px-3 py-2 rounded-lg">
                  <Avatar className="w-6 h-6" />
                  <Name className="text-sm font-medium" />
                </div>
              </ConnectWallet>
            </Wallet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-3xl mx-auto px-4 py-6">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 glass-card mx-4 mb-4 p-4">
        <div className="flex justify-around">
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
            <MapPin className="w-6 h-6 text-purple-400" />
            <span className="text-xs text-gray-300">Deliveries</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
            <Package className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-300">Create</span>
          </button>
          
          <button className="flex flex-col items-center space-y-1 p-2 rounded-lg hover:bg-white hover:bg-opacity-10 transition-all duration-200">
            <User className="w-6 h-6 text-gray-400" />
            <span className="text-xs text-gray-300">Profile</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
