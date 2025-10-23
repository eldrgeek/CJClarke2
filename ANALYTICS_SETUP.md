# Analytics Setup Guide

Your website now has a complete analytics system with both custom tracking and Google Analytics 4 integration!

## Features

✅ **Custom Analytics Dashboard** at `/admin`
- Real-time visit counter
- Unique visitor tracking
- Top pages analytics
- Password protected
- No external dependencies

✅ **Google Analytics 4 Integration**
- Comprehensive tracking
- Traffic sources
- User demographics
- Real-time reporting
- Historical data

## Quick Start

### 1. Access Your Admin Dashboard

Visit your website at `/admin` (e.g., `https://yoursite.com/admin`)

**Default Password:** `cjclark2025`

⚠️ **Important:** Change the default password before deploying to production!

### 2. Set Up Google Analytics 4 (Optional but Recommended)

#### Step 1: Create GA4 Account
1. Go to [analytics.google.com](https://analytics.google.com)
2. Click "Start measuring"
3. Enter your account name (e.g., "CJ Clark Campaign")
4. Configure your property:
   - Property name: "CJ Clark Website"
   - Time zone: Your local time zone
   - Currency: USD
5. Select "Web" as platform
6. Enter your website URL

#### Step 2: Get Your Measurement ID
1. After setup, you'll see your Measurement ID (format: `G-XXXXXXXXXX`)
2. Copy this ID

#### Step 3: Add to Your Website
1. Open `.env` file in your project root
2. Replace the placeholder:
   ```
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```
   with your actual Measurement ID:
   ```
   VITE_GA_MEASUREMENT_ID=G-ABC1234567
   ```

#### Step 4: Deploy
```bash
npm run build
```
Then deploy to Netlify (it will automatically pick up the environment variables from your `.env` file or Netlify's environment settings)

## Configuration

### Change Admin Password

**Option 1: Environment Variable (Recommended)**
1. Edit `.env` file:
   ```
   VITE_ADMIN_PASSWORD=your-secure-password-here
   ```

**Option 2: Netlify Environment Variables (For Production)**
1. Go to Netlify Dashboard → Site Settings → Environment Variables
2. Add:
   - Key: `VITE_ADMIN_PASSWORD`
   - Value: Your secure password

### Environment Variables Reference

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `VITE_GA_MEASUREMENT_ID` | Google Analytics 4 Measurement ID | No | G-XXXXXXXXXX |
| `VITE_ADMIN_PASSWORD` | Admin dashboard password | No | cjclark2025 |

## How It Works

### Custom Analytics
- **Netlify Functions**: Server-side tracking via `/netlify/functions/track-visit` and `/netlify/functions/get-analytics`
- **Client-side**: Automatic page view tracking on every page load
- **Storage**: In-memory (resets on function cold start)
- **Visitor ID**: Stored in browser localStorage for unique visitor tracking

### Google Analytics 4
- Tracks page views, user behavior, and traffic sources
- Data persists indefinitely
- Provides advanced reporting and insights
- Integrates with other Google services

## Viewing Your Analytics

### Custom Dashboard
- Visit `/admin` on your website
- Enter your admin password
- View real-time statistics:
  - Total page views
  - Unique visitors
  - Pages per visit
  - Top pages with visual charts
- Auto-refreshes every 30 seconds

### Google Analytics Dashboard
- Visit [analytics.google.com](https://analytics.google.com)
- View comprehensive reports:
  - Real-time users
  - Traffic sources
  - User demographics
  - Conversion tracking
  - Custom reports

## Upgrading to Persistent Storage

The current custom analytics uses in-memory storage which resets when Netlify Functions restart (cold starts). For production, you may want persistent storage:

### Option 1: Netlify Blobs (Recommended for Netlify)
- Built-in Netlify storage
- Free tier available
- Simple integration

### Option 2: Supabase (Free PostgreSQL)
- Free tier: 500MB database
- Real-time capabilities
- Easy to integrate

### Option 3: Firebase Firestore
- Free tier: 1GB storage
- Real-time database
- Google integration

## Security Notes

1. **Admin Password**: Always change the default password before deploying
2. **HTTPS**: Ensure your site uses HTTPS (Netlify does this automatically)
3. **Rate Limiting**: Consider adding rate limiting for the analytics endpoints
4. **Privacy**: The custom analytics respects user privacy by using anonymous visitor IDs

## Troubleshooting

### Admin dashboard shows 0 visits
- **Cause**: Functions haven't received any traffic yet or function cold started
- **Solution**: Visit a few pages on your site, then refresh the admin dashboard

### Google Analytics not tracking
- **Check**: Verify `VITE_GA_MEASUREMENT_ID` is set correctly in `.env`
- **Check**: Rebuild and redeploy your site after adding the ID
- **Check**: Open browser console and look for GA4 script loading

### Can't access /admin
- **Check**: Clear your browser cache
- **Check**: Ensure you're using the correct password
- **Check**: Check browser console for errors

## Next Steps

1. ✅ Test the admin dashboard at `/admin`
2. ✅ Set up Google Analytics 4 (5 minutes)
3. ✅ Change the default admin password
4. ✅ Deploy to production
5. ✅ Monitor your analytics daily

## Support

For issues or questions:
- Check Netlify Functions logs in your Netlify dashboard
- Review browser console for client-side errors
- Verify environment variables are set correctly

---

**Built with:** React, TypeScript, Netlify Functions, Google Analytics 4


