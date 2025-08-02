<div align="center">
<h1>✨ Full Stack Realtime Chat App ✨</h1>
</div>

## **🚀 Highlights**  

- 🌟 **Tech Stack:** MERN (MongoDB, Express.js, React.js, Node.js) + Socket.io + TailwindCSS + DaisyUI  
- 🔐 **Authentication & Authorization:** Secured with JWT for a safe experience  
- 💬 **Real-time Messaging:** Enjoy instant conversations powered by Socket.io  
- 🟢 **Online User Status:** See who's online/offline in real-time  
- 🛠 **Global State Management:** Efficient state management with Zustand  
- 🐞 **Error Handling:** Robust error handling on both client & server sides  
- 🚀 **Deployment:** Easy deployment options to launch your app **for FREE**  
- ⏳ **And much more!** 🎉  

---

## **🔧 Setup `.env` File**  

To get started, create a `.env` file in the root directory of your project and add the following variables:  

```env
MONGODB_URI=your_mongodb_connection_string
PORT=5001
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

NODE_ENV=development
# For production deployment on Render (optional)
FRONTEND_URL=https://your-frontend-url.com
HEALTH_CHECK_URL=https://your-backend-url.com/api/health
```

---

## **📦 Build the App**  

Run the following command to build the application:  

```bash
npm run build
```

---

## **🚀 Start the App**  

To start the application, run:  

```bash
npm start
```

---

## **🔄 Prevent Cold Starts on Render (Free Tier)**

Render's free tier puts apps to sleep after 15 minutes of inactivity. To prevent this, use the included ping script:

```bash
# Run the ping script to keep your app alive
npm run ping --prefix backend
```

The ping script will:
- Send a request to `/api/health` every 14 minutes
- Keep your app active and prevent cold starts
- Display status logs with timestamps

**Note:** Run this script on a separate service or your local machine to keep your deployed app active.

---
## **🌐 Live Demo**  
[**Click here to try the app live**](https://chatx-oyba.onrender.com/login)

---

## **🖼️ Screenshots**

### Chat App Interface
![Chat App UI Screenshot](https://github.com/singhabhishek98/ChatX/blob/main/UI)

---

## **👨‍💻 Author**  
<h2> Do not forget to give a star!⭐🤗 </h2>
<div align="right">
  <h3>Made with ❤️ by Abhishek Singh</h3>

