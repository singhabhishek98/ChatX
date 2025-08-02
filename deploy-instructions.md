# 🚀 Deployment Instructions for Render

## Environment Variables for Render

Set these environment variables in your Render dashboard:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=production
FRONTEND_URL=https://your-app-name.onrender.com
HEALTH_CHECK_URL=https://your-app-name.onrender.com/api/health
```

## Build & Start Commands for Render

- **Build Command:** `npm run build`
- **Start Command:** `npm start`

## To prevent cold starts:

1. Deploy your app on Render
2. Note your app's URL (e.g., `https://your-app-name.onrender.com`)
3. Update the `HEALTH_CHECK_URL` in your local `.env` file or ping script
4. Run the ping script locally: `npm run ping --prefix backend`

## Alternative Ping Services:

- **UptimeRobot** (Free tier: 50 monitors, 5-minute intervals)
- **Cronitor** (Free tier: 5 monitors)
- **Better Uptime** (Free tier: 10 monitors)

These services can ping your `/api/health` endpoint automatically.
