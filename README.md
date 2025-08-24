# JNTUK Canteen Management System

A modern, real-time canteen management system built with React, TypeScript, and MongoDB Atlas.

## 🚀 Features

- **Real-time Menu Updates** - Changes sync across all devices instantly
- **Admin Panel** - Manage menu items, prices, and availability
- **MongoDB Atlas Integration** - Cloud database with automatic scaling
- **Responsive Design** - Works perfectly on mobile and desktop
- **Live Status Indicators** - See connection status and last update times

## 📋 Prerequisites

Before deployment, ensure you have:

1. **MongoDB Atlas Account** - [Sign up here](https://www.mongodb.com/cloud/atlas)
2. **Node.js** - Version 18 or higher
3. **Git** - For version control

## 🛠️ Local Development Setup

### 1. Clone and Install Dependencies
```bash
git clone <your-repo-url>
cd newcanteen
npm install
```

### 2. Configure MongoDB Atlas

1. Create a MongoDB Atlas cluster
2. Create a database user with read/write permissions
3. Get your connection string from Atlas
4. Update `.env` file:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/canteen?retryWrites=true&w=majority
PORT=3001
```

### 3. Start Development Servers
```bash
# Start both frontend and backend
npm run dev:full

# Or start separately:
npm run dev:server  # Backend (port 3001)
npm run dev        # Frontend (port 5173)
```

### 4. Access the Application
- **Customer View**: http://localhost:5173
- **Admin Panel**: Click "Admin Login" (Username: Admin, Password: Admin123)

## 🌐 Deployment Options

### Option 1: Deploy Frontend Only (Static Hosting)

For static hosting platforms like Netlify, Vercel, or GitHub Pages:

```bash
# Build the frontend
npm run build

# Deploy the 'dist' folder to your hosting platform
```

**Note**: This requires a separate backend deployment or serverless functions.

### Option 2: Full-Stack Deployment (Recommended)

For platforms that support Node.js backends:

#### A. Railway Deployment
1. Connect your GitHub repo to Railway
2. Add environment variables in Railway dashboard
3. Railway will automatically detect and deploy both frontend and backend

#### B. Render Deployment
1. Create a new Web Service on Render
2. Connect your GitHub repository
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run dev:server`
5. Add environment variables

#### C. Heroku Deployment
```bash
# Install Heroku CLI and login
heroku create your-app-name
heroku config:set MONGODB_URI="your-connection-string"
git push heroku main
```

### Option 3: Docker Deployment

```dockerfile
# Dockerfile (create this file)
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3001
CMD ["npm", "run", "dev:server"]
```

```bash
# Build and run Docker container
docker build -t canteen-app .
docker run -p 3001:3001 -e MONGODB_URI="your-connection-string" canteen-app
```

## 🔧 Environment Variables

Required environment variables for deployment:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/canteen?retryWrites=true&w=majority
PORT=3001
NODE_ENV=production
```

## 📱 Application Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # Navigation header
│   ├── HomePage.tsx    # Customer menu view
│   ├── LoginPage.tsx   # Admin login
│   └── AdminPanel.tsx  # Admin management
├── services/
│   └── api.ts          # API service layer
├── types.ts            # TypeScript definitions
└── App.tsx             # Main application

server/
└── index.js            # Express.js backend server
```

## 🎯 Admin Features

- Add/Edit/Delete menu items
- Toggle item availability
- Bulk menu updates
- Real-time synchronization
- Category management

## 🔒 Security Notes

- Change default admin credentials before deployment
- Use environment variables for sensitive data
- Enable MongoDB Atlas IP whitelist for production
- Consider implementing proper authentication for production use

## 🐛 Troubleshooting

### Common Issues:

1. **Connection Failed**: Ensure MongoDB Atlas allows connections from your IP
2. **CORS Errors**: Backend includes CORS middleware for cross-origin requests
3. **Port Conflicts**: Backend runs on 3001, frontend on 5173
4. **Build Errors**: Ensure all dependencies are installed with `npm install`

### Debug Commands:
```bash
# Check if backend is running
curl http://localhost:3001/api/menu-items

# View backend logs
npm run dev:server

# Clear node modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues or questions:
- Check the browser console for error messages
- Verify MongoDB Atlas connection string
- Ensure all environment variables are set correctly

---

Built with ❤️ for JNTUK Canteen Management