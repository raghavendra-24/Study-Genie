# 📚 Study Genie Documentation Index

Quick reference guide to all documentation files in the Study Genie project.

## 📖 Documentation Files

### 1. [Main README](./README.md)
**Purpose**: Project overview and getting started guide

**Contains:**
- Project overview and features
- Architecture diagrams
- Tech stack details
- Quick start guide
- Deployment instructions
- API quick reference
- Database schema overview

**Read this first** if you're new to the project.

---

### 2. [Backend README](./Backend/README.md)
**Purpose**: Complete backend API documentation

**Contains:**
- Backend architecture
- All API endpoints with examples
- Database models and schemas
- Socket.IO events documentation
- File upload system
- AI integration details
- Error handling
- Deployment guide

**Read this** if you need to:
- Understand backend API
- Integrate with backend
- Add new API endpoints
- Understand database structure
- Work with Socket.IO

---

### 3. [Frontend README](./frontend/README.md)
**Purpose**: Complete frontend documentation

**Contains:**
- Frontend architecture
- Component structure
- Page components overview
- Contexts and hooks
- API integration
- Routing structure
- Styling guide
- Build and deployment

**Read this** if you need to:
- Understand frontend structure
- Add new components
- Work with React components
- Understand routing
- Integrate with API

---

### 4. [Components Guide](./COMPONENTS_GUIDE.md)
**Purpose**: Detailed component and feature documentation

**Contains:**
- Study Room components deep dive
- AI-powered learning tools explanation
- Game components details
- Dashboard components
- Authentication flow
- Real-time communication
- File upload system
- Data flow examples

**Read this** if you need to:
- Understand how specific features work
- See component interactions
- Understand data flows
- Debug specific features
- Add new features

---

## 🗺️ Navigation Guide

### I want to...

#### ...get started with the project
→ Read [Main README](./README.md) - Getting Started section

#### ...understand the backend API
→ Read [Backend README](./Backend/README.md) - API Endpoints section

#### ...understand the frontend structure
→ Read [Frontend README](./frontend/README.md) - Project Structure section

#### ...understand how Study Rooms work
→ Read [Components Guide](./COMPONENTS_GUIDE.md) - Study Room Components section

#### ...understand AI features
→ Read [Components Guide](./COMPONENTS_GUIDE.md) - AI-Powered Learning Tools section

#### ...add a new API endpoint
→ Read [Backend README](./Backend/README.md) - API Endpoints section
→ Check existing routes in `Backend/routes/`

#### ...add a new page/component
→ Read [Frontend README](./frontend/README.md) - Pages section
→ Check existing pages in `frontend/src/pages/`

#### ...understand real-time features
→ Read [Components Guide](./COMPONENTS_GUIDE.md) - Real-time Communication section
→ Read [Backend README](./Backend/README.md) - Socket.IO Events section

#### ...deploy the application
→ Read [Main README](./README.md) - Deployment section
→ Read [Backend README](./Backend/README.md) - Deployment section
→ Read [Frontend README](./frontend/README.md) - Build & Deployment section

#### ...understand database structure
→ Read [Backend README](./Backend/README.md) - Database Models section
→ Check models in `Backend/models/`

#### ...understand authentication
→ Read [Components Guide](./COMPONENTS_GUIDE.md) - Authentication Flow section
→ Check `frontend/src/contexts/AuthContext.tsx`

#### ...understand file uploads
→ Read [Components Guide](./COMPONENTS_GUIDE.md) - File Upload System section
→ Read [Backend README](./Backend/README.md) - File Uploads section

---

## 📂 File Structure Reference

### Backend Files

```
Backend/
├── README.md              # Backend documentation
├── server.js              # Main server + Socket.IO
├── config/
│   └── db.js             # MongoDB connection
├── models/               # Database schemas
│   ├── User.js
│   ├── StudyRoom.js
│   ├── Message.js
│   └── ...
└── routes/               # API routes
    ├── auth.js
    ├── studyRooms.js
    └── ...
```

### Frontend Files

```
frontend/
├── README.md              # Frontend documentation
├── src/
│   ├── pages/            # Page components
│   │   ├── Dashboard.tsx
│   │   ├── StudyRoom.tsx
│   │   └── ...
│   ├── components/      # Reusable components
│   │   ├── AppSidebar.tsx
│   │   ├── study-room/   # Study room components
│   │   └── ...
│   ├── contexts/        # React contexts
│   │   ├── AuthContext.tsx
│   │   └── SocketContext.tsx
│   └── lib/             # Utilities
│       ├── api.ts
│       └── study-room-api.ts
```

---

## 🔍 Quick Reference

### API Base URLs

- **Local**: `http://localhost:5000/api`
- **Production**: `https://peekuthon-education.onrender.com/api`

### Socket.IO URLs

- **Local**: `http://localhost:5000`
- **Production**: `https://peekuthon-education.onrender.com`

### Frontend URLs

- **Local**: `http://localhost:5173`
- **Production**: `https://peekuthon-eduplatform.netlify.app`

### Key Environment Variables

**Backend:**
- `MONGODB_URI` - MongoDB connection string
- `GEMINI_API_KEY` - Google Gemini API key
- `FRONTEND_URL` - Frontend URL for CORS

**Frontend:**
- `VITE_API_BASE_URL` - Backend API URL
- `VITE_SOCKET_URL` - Socket.IO server URL
- `VITE_GEMINI_*_API_KEY` - Multiple Gemini API keys

---

## 🎯 Common Tasks

### Setting up development environment
1. Read [Main README](./README.md) - Getting Started
2. Set up MongoDB Atlas
3. Get Google Gemini API keys
4. Configure environment variables
5. Run backend and frontend

### Understanding a specific feature
1. Check [Components Guide](./COMPONENTS_GUIDE.md) for feature explanation
2. Check relevant page component in `frontend/src/pages/`
3. Check relevant API route in `Backend/routes/`
4. Check relevant database model in `Backend/models/`

### Adding a new feature
1. Plan the feature (what it does, how it works)
2. Create database model if needed (see [Backend README](./Backend/README.md))
3. Create API routes (see [Backend README](./Backend/README.md))
4. Create frontend page/component (see [Frontend README](./frontend/README.md))
5. Add routing if needed (see [Frontend README](./frontend/README.md))
6. Test the feature
7. Update documentation

### Debugging issues
1. Check browser console for frontend errors
2. Check server logs for backend errors
3. Verify environment variables
4. Check API endpoints (see [Backend README](./Backend/README.md))
5. Check Socket.IO connection (see [Components Guide](./COMPONENTS_GUIDE.md))
6. Verify database connection

---

## 📝 Documentation Standards

When adding new features, update:
1. **Main README** - Add feature to features list
2. **Backend README** - Add API endpoints
3. **Frontend README** - Add component/page documentation
4. **Components Guide** - Add feature explanation

---

## 🆘 Need Help?

1. Check the relevant documentation file
2. Check the code comments in source files
3. Review similar existing features
4. Check GitHub issues
5. Ask in project discussions

---

**Happy Coding! 🚀**

