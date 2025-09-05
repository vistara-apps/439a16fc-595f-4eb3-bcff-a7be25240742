# ShipnEarn - Decentralized Delivery Marketplace

Deliver locally, get paid instantly. Your decentralized bounty marketplace for deliveries on the Base network.

## Features

- **On-Demand Courier Matching**: Post delivery requests and get matched with verified couriers
- **Secure Smart Contract Escrow**: Automated payments through Base network smart contracts
- **Real-Time Tracking**: Track deliveries with transparent, verifiable updates
- **Dynamic Bounty Pricing**: Fair compensation based on distance, urgency, and item value
- **Reputation System**: Build trust through ratings and successful delivery history

## Tech Stack

- **Frontend**: Next.js 15 with App Router, TypeScript, Tailwind CSS
- **Blockchain**: Base network integration via OnchainKit
- **Wallet**: MiniKit for seamless wallet interactions
- **UI**: Glassmorphic design with mobile-first approach
- **State**: React hooks with local state management

## Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.local.example .env.local
   ```
   Add your OnchainKit API key to `.env.local`

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

## Core User Flows

### Dispatcher (Sender)
1. Connect Base wallet
2. Create delivery request with pickup/dropoff locations
3. Set bounty amount and package details
4. Smart contract locks bounty in escrow
5. Track courier progress in real-time
6. Rate courier after successful delivery

### Courier (Delivery Person)
1. Browse available delivery requests
2. Accept delivery and confirm pickup
3. Navigate to pickup location
4. Collect package and update status
5. Deliver to dropoff location
6. Receive instant payment via smart contract

## Smart Contract Integration

- **DeliveryEscrow**: Manages bounty payments and automatic releases
- **ReputationManager**: Tracks courier ratings and delivery history
- **Base Network**: Leverages fast, low-cost transactions

## Design System

- **Colors**: Dark theme with purple/blue gradients
- **Components**: Glassmorphic cards with backdrop blur
- **Typography**: Clean, modern font hierarchy
- **Motion**: Smooth transitions with cubic-bezier easing
- **Layout**: Mobile-first responsive grid system

## Development

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details
