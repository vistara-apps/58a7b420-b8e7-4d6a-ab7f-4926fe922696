# FoundIt - School Lost & Found Base Mini App

A mobile-first lost and found management system for elementary schools built on Base.

## Features

- 📸 **30-Second Item Upload** - Quick photo capture with auto-categorization
- 🔍 **Visual Browse & Smart Search** - Grid view with category filters
- ✅ **Verified Claim System** - Admin-approved claims with audit trail
- ⏰ **Auto-Expiration Tracker** - 30/60/90 day tracking with notifications
- 🔔 **Parent Notification System** - Alerts for matching items
- 📊 **Admin Dashboard Analytics** - Insights and reporting

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit)
- **Styling**: Tailwind CSS with BASE theme
- **State Management**: React Query
- **Authentication**: Magic links (planned)
- **Image Storage**: Cloudinary (planned)

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Copy environment variables:
```bash
cp .env.local.example .env.local
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
app/
├── components/          # Reusable UI components
│   ├── ItemCard.tsx    # Lost item display card
│   ├── SearchBar.tsx   # Search input component
│   └── CategoryFilter.tsx # Category filter chips
├── globals.css         # Global styles with BASE theme
├── layout.tsx          # Root layout with providers
├── page.tsx            # Main browse page
└── providers.tsx       # OnchainKit & React Query setup

public/
└── .well-known/
    └── farcaster.json  # Mini App manifest
```

## Design System

The app uses the **BASE theme** with:
- Dark blue background (#1a2332)
- Base blue accents (#0052ff)
- Rounded borders and modern shadows
- Mobile-first responsive design

## Next Steps

1. Implement authentication with magic links
2. Add image upload with Cloudinary
3. Build admin dashboard
4. Add claim submission flow
5. Implement notification system
6. Add analytics tracking

## License

MIT
