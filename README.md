# CJ Clark Campaign Website

Official campaign website for CJ Clark's city council campaign.

## 🚀 Features

- ✅ Modern, responsive design
- ✅ Bilingual support (English/Spanish)
- ✅ Campaign issues and news
- ✅ Donation integration (Zeffy)
- ✅ **Built-in Analytics Dashboard** 📊
- ✅ Google Analytics 4 integration
- ✅ Fast, optimized builds with Vite

## 📊 Analytics System

This website includes a complete analytics system with both custom tracking and Google Analytics 4 integration.

### Quick Start

1. **Access Admin Dashboard**: Visit `/admin` on your website
   - Default password: `cjclark2025`
   - ⚠️ Change this before deploying to production!

2. **Set Up Google Analytics 4** (Optional):
   - Get your GA4 Measurement ID from [analytics.google.com](https://analytics.google.com)
   - Create `.env` file in project root:
     ```bash
     VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
     VITE_ADMIN_PASSWORD=your-secure-password
     ```

3. **Deploy**: Analytics will start tracking automatically!

📖 **Full Documentation**: See [ANALYTICS_SETUP.md](./ANALYTICS_SETUP.md) for complete setup instructions.

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
├── src/
│   ├── components/          # React components
│   │   ├── AdminDashboard.tsx      # Analytics admin panel
│   │   ├── AnalyticsTracker.tsx    # Tracking component
│   │   └── ...
│   ├── content/             # Markdown content
│   │   ├── issues/          # Campaign issues
│   │   ├── news/            # News articles
│   │   └── pages/           # Static pages
│   └── lib/                 # Utilities
├── netlify/
│   └── functions/           # Serverless functions
│       ├── track-visit.ts   # Visit tracking
│       └── get-analytics.ts # Analytics API
└── public/                  # Static assets
```

## 🚀 Deployment

This site is configured for Netlify deployment:

1. Push to GitHub
2. Connect to Netlify
3. Set environment variables in Netlify dashboard:
   - `VITE_GA_MEASUREMENT_ID` (optional)
   - `VITE_ADMIN_PASSWORD` (recommended)
4. Deploy!

## 🔐 Security

- Admin dashboard is password protected
- Analytics data is anonymized
- HTTPS enforced by Netlify
- No personally identifiable information collected

## 📝 License

Campaign website for CJ Clark

---

**Built with:** React, TypeScript, Vite, Tailwind CSS, Netlify Functions
