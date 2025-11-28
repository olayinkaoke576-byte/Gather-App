# Gather App - Deployment Guide

## ✅ GitHub Repository

**Repository URL**: https://github.com/olayinkaoke576-byte/Gather-App

The complete Gather App codebase has been successfully pushed to GitHub with all features implemented.

---

## 🚀 Quick Deploy to Vercel

### Option 1: One-Click Deploy (Recommended)

1. Go to [Vercel](https://vercel.com)
2. Click "Add New Project"
3. Import from GitHub: `olayinkaoke576-byte/Gather-App`
4. Click "Deploy"

That's it! Vercel will automatically detect Next.js and deploy your app.

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Navigate to project
cd c:\Users\hp\Desktop\hug

# Deploy
vercel

# Follow prompts:
# - Link to existing project? No
# - Project name: gather-app
# - Directory: ./
# - Override settings? No

# Deploy to production
vercel --prod
```

---

## 🗄️ Supabase Backend Integration

### Step 1: Create Supabase Project

1. Go to [Supabase](https://supabase.com)
2. Create new project
3. Note your:
   - Project URL
   - Anon/Public Key

### Step 2: Database Schema

Run this SQL in Supabase SQL Editor:

```sql
-- Users table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  avatar_url TEXT,
  bio TEXT,
  interests TEXT[],
  role TEXT DEFAULT 'ATTENDEE',
  kyc_status TEXT DEFAULT 'NONE',
  is_premium BOOLEAN DEFAULT FALSE,
  is_verified BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMP NOT NULL,
  location TEXT NOT NULL,
  organizer_id UUID REFERENCES users(id),
  image_url TEXT,
  price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Tickets table
CREATE TABLE tickets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id),
  user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'VALID',
  qr_token TEXT NOT NULL,
  purchased_at TIMESTAMP DEFAULT NOW()
);

-- Posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id),
  event_id UUID REFERENCES events(id),
  text TEXT,
  media_url TEXT,
  event_tag TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Friend requests table
CREATE TABLE friend_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id),
  to_user_id UUID REFERENCES users(id),
  status TEXT DEFAULT 'PENDING',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_user_id UUID REFERENCES users(id),
  to_user_id UUID REFERENCES users(id),
  content TEXT NOT NULL,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE friend_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Policies (example for users table)
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);
```

### Step 3: Install Supabase Client

```bash
npm install @supabase/supabase-js
```

### Step 4: Configure Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 5: Create Supabase Client

Create `lib/supabase.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

### Step 6: Update AuthContext

Replace mock auth in `context/AuthContext.tsx` with Supabase auth:

```typescript
import { supabase } from '@/lib/supabase';

// Login function
const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Fetch user profile
  const { data: profile } = await supabase
    .from('users')
    .select('*')
    .eq('id', data.user.id)
    .single();
    
  setUser(profile);
};

// Signup function
const signup = async (email: string, password: string, name: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });
  
  if (error) throw error;
  
  // Create user profile
  await supabase.from('users').insert({
    id: data.user!.id,
    email,
    name,
  });
};
```

---

## 📱 Additional Integrations

### Stripe (Payments)

```bash
npm install @stripe/stripe-js stripe
```

```typescript
// lib/stripe.ts
import { loadStripe } from '@stripe/stripe-js';

export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);
```

### Cloudinary (Media Upload)

```bash
npm install cloudinary
```

### Google Maps API

```bash
npm install @googlemaps/js-api-loader
```

---

## 🔒 Environment Variables (Complete List)

```env
# App
NEXT_PUBLIC_APP_URL=https://your-app.vercel.app

# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Google Maps
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key

# MQTT (optional)
NEXT_PUBLIC_MQTT_URL=wss://your-mqtt-broker.com
```

---

## ✅ Deployment Checklist

- [x] Code pushed to GitHub
- [ ] Vercel project created and deployed
- [ ] Supabase project created
- [ ] Database schema applied
- [ ] Environment variables configured in Vercel
- [ ] Supabase client integrated
- [ ] Auth system migrated to Supabase
- [ ] Stripe account created (for payments)
- [ ] Cloudinary account created (for media)
- [ ] Google Maps API enabled
- [ ] Custom domain configured (optional)
- [ ] SSL certificate verified
- [ ] Analytics setup (Google Analytics/Mixpanel)
- [ ] Error monitoring (Sentry)

---

## 🎯 Next Steps

1. **Deploy to Vercel** (5 minutes)
   - Visit https://vercel.com
   - Import GitHub repository
   - Click Deploy

2. **Setup Supabase** (15 minutes)
   - Create project
   - Run SQL schema
   - Copy credentials to Vercel

3. **Test Live App** (10 minutes)
   - Visit deployed URL
   - Test all features
   - Verify PWA installation

4. **Add Custom Domain** (optional)
   - Configure in Vercel settings
   - Update DNS records

---

## 📞 Support

If you encounter any issues:

1. Check Vercel deployment logs
2. Verify environment variables
3. Test Supabase connection
4. Review browser console for errors

---

**Current Status**: Code is live on GitHub and ready for deployment!

**GitHub**: https://github.com/olayinkaoke576-byte/Gather-App
**Next**: Deploy to Vercel (click "Import" on Vercel dashboard)
