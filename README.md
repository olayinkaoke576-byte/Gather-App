<<<<<<< HEAD
# Gather App

A next-generation event ticketing and social discovery platform that transforms attending events from a transaction into a connected experience.

## 🎯 Core Features

### Trust & Security
- **Dynamic QR Codes**: Rotating validation tokens to prevent fraud
- **KYC Verification**: Identity verification for organizers
- **Ghost Mode**: Privacy-first location sharing
- **Verified Badges**: Trust indicators for users

### Social Discovery
- **Friend Matching**: AI-powered interest-based connections (95% match scores)
- **Event Chat**: Real-time MQTT chat rooms
- **Social Feed**: Instagram-style feed with Stories
- **Public Posts**: Share experiences with photo/video upload

### Location & Logistics
- **Live Location Sharing**: Toggle-based with privacy controls
- **Nearby Services**: Hotels, Restaurants, Gas stations
- **Ride Hailing**: Uber/Bolt integration with fare estimates
- **Interactive Maps**: React Leaflet with venue markers

### Creator Economy
- **Event Creation**: DIY event hosting wizard
- **Promoter Dashboard**: Analytics, heatmaps, demographics
- **Push Marketing**: Targeted notifications
- **Revenue Tracking**: Real-time metrics

## 💰 Monetization

- **B2C Premium**: Ghost Mode, Fast Pass DM, Verified Badges, Squad Pack
- **B2B Tools**: Analytics Dashboard, Push Marketing
- **Affiliate**: Ride-hailing commissions, Nearby Partners ads

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **Maps**: React Leaflet
- **Chat**: MQTT.js
- **PWA**: @ducanh2912/next-pwa
- **Storage**: IndexedDB + LocalStorage

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/olayinkaoke576-byte/Gather-App.git

# Navigate to project
cd Gather-App

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 🏗️ Project Structure

```
gather-app/
├── app/                    # Next.js app router
│   ├── (main)/            # Authenticated routes
│   │   ├── home/          # Dashboard
│   │   ├── tickets/       # Ticket display
│   │   ├── chat/          # Event chat
│   │   ├── map/           # Location & services
│   │   ├── create/        # Event creation
│   │   ├── profile/       # User profile
│   │   └── dashboard/     # Promoter analytics
│   └── page.tsx           # Login/Landing
├── components/
│   ├── features/          # Feature components
│   ├── layout/            # Layout components
│   └── providers/         # Context providers
├── context/               # React Context
├── hooks/                 # Custom hooks
├── lib/                   # Utilities
└── types/                 # TypeScript types
```

## 🎨 Features

- ✅ 35+ implemented features
- ✅ 20+ custom components
- ✅ 7 app routes
- ✅ PWA offline support
- ✅ Dark mode
- ✅ Responsive design
- ✅ Premium UI/UX

## 🔧 Environment Variables

Create a `.env.local` file:

```env
# App
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Supabase (for production)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# MQTT (for production)
NEXT_PUBLIC_MQTT_URL=your_mqtt_broker_url
```

## 📱 Demo

Currently running with mock data. All features are functional for demo purposes.

## 🚀 Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Manual Deployment

1. Build the app: `npm run build`
2. Start production server: `npm start`

## 📝 License

MIT License - see LICENSE file for details

## 👥 Contributing

Contributions welcome! Please read CONTRIBUTING.md first.

## 🙏 Acknowledgments

Built with Next.js, TailwindCSS, and Framer Motion.

---

**Status**: Production-ready MVP with mock data. Backend integration pending.
=======
# Gather-App
>>>>>>> 79f44f32514534b8cf45fb84ca558ed2c9bbce3b
