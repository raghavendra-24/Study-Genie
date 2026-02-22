# 🎓 Study Genie - Comprehensive Education Platform

A full-stack educational platform powered by AI, featuring interactive learning tools, collaborative study rooms, gamified assessments, and real-time communication capabilities.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Deployment](#deployment)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Real-time Features](#real-time-features)
- [Component Guide](#component-guide)
- [Contributing](#contributing)

## 🌐 Live Demo

- **Frontend**: [https://peekuthon-eduplatform.netlify.app](https://peekuthon-eduplatform.netlify.app)
- **Backend API**: [https://peekuthon-education.onrender.com](https://peekuthon-education.onrender.com)

## 📖 Overview

Study Genie is an AI-powered educational platform designed to enhance learning through:

- **AI-Generated Content**: Books, quizzes, flashcards, courses, and learning resources
- **Interactive Learning**: Concept animations, audio learning, and visual flowcharts
- **Collaborative Spaces**: Real-time study rooms with chat, notes, and file sharing
- **Gamification**: IQ tests, aptitude tests, GK quizzes, and puzzle games
- **Personalized Dashboard**: Track progress, view analytics, and manage learning activities

## ✨ Features

### 📚 AI-Powered Learning Tools

#### 1. **Read Book**

- Generate comprehensive digital books on any topic
- Two-page spread layout for better reading experience
- Save and revisit generated books
- AI-powered content generation using Google Gemini

#### 2. **Question Bot**

- Interactive AI assistant for answering learning queries
- Conversation history saved per user
- Context-aware responses
- Supports follow-up questions

#### 3. **Quiz Generator**

- Generate quizzes on any topic with customizable difficulty
- Multiple choice questions with instant feedback
- Score tracking and performance analytics
- Save quiz attempts for review

#### 4. **Flashcard Generator**

- Create interactive flashcard decks
- Front/back card format
- Organized by topics
- Study mode with flip animations

#### 5. **Concept Animator**

- Visualize complex concepts with step-by-step animations
- Topic summaries and explanations
- Interactive learning experience

#### 6. **Learning Resource Generator**

- Curated educational resources (books, videos, websites, courses)
- Topic-based recommendations
- External links and references

#### 7. **Course Generator**

- Generate structured courses on any subject
- Module-based learning paths
- Progress tracking
- Completion certificates

#### 8. **Flowchart Generator**

- Visual flowchart creation for processes and concepts
- Interactive diagrams
- Export capabilities

#### 9. **Hear and Learn**

- Audio-based learning experience
- Text-to-speech functionality
- Listen to generated content

### 🎮 Game Zone

#### 1. **IQ Test**

- Standardized intelligence quotient assessment
- Multiple question types
- Score tracking and leaderboards

#### 2. **Aptitude Test**

- Problem-solving skill assessment
- Logical reasoning questions
- Performance analytics

#### 3. **GK Test**

- General knowledge challenges
- Various categories
- Score tracking

#### 4. **2048 Game**

- Classic puzzle game
- Score tracking
- Leaderboard integration

### 👥 Collaboration Features

#### 1. **Study Rooms**

- Create or join virtual study rooms
- Unique 6-character room codes
- Participant management (max 50 per room)
- Real-time synchronization

#### 2. **Real-time Chat**

- Live messaging with all participants
- File and image sharing
- AI assistant integration (mention @ai in messages)
- Message history persistence

#### 3. **Note Board**

- Shared collaborative note-taking
- Real-time updates
- Edit and delete notes
- User attribution

#### 4. **Media Sharing**

- Upload images, PDFs, and documents
- Share files in chat
- File preview capabilities

### 📊 Dashboard & Analytics

- **Activity Overview**: Total books, quizzes, flashcards, chats, concepts, games, resources, and courses
- **Recent Activity**: Latest learning materials and interactions
- **Performance Metrics**: Quiz scores, completion rates, study time
- **Activity Heatmap**: 7-day activity visualization
- **Learning Summary**: Progress tracking and statistics

### 💳 Premium Features

#### 1. **Live Doubt Session**

- Book 1-hour interactive sessions with expert mentors (₹300)
- Real-time payment processing via Razorpay
- Instant secure meeting link generation (Jitsi Meet)
- SMS notifications sent to students, parents, and mentors
- Session validity tracking (1-hour expiry)
- Payment verification and order management
- Secure UPI, Card, and Net Banking options

### 📰 Additional Features

- **News Feed**: Latest educational news via GNews API
- **User Profiles**: Personalized dashboards and settings
- **Authentication**: Secure login/signup with mobile number
- **File Uploads**: Support for images, PDFs, and documents

## 🏗️ Architecture

### System Architecture

```
┌─────────────────┐         ┌─────────────────┐
│   Frontend      │         │    Backend      │
│   (React/TS)    │◄───────►│  (Node/Express) │
│   Port: 5173    │  HTTP   │   Port: 5000    │
└─────────────────┘         └─────────────────┘
                                      │
                                      │
                            ┌─────────▼─────────┐
                            │   MongoDB Atlas   │
                            │   (Database)      │
                            └───────────────────┘

┌─────────────────┐         ┌─────────────────┐
│  Socket.IO      │         │  Google Gemini  │
│  (WebSocket)    │         │      AI API     │
└─────────────────┘         └─────────────────┘
```

### Frontend Architecture

- **Component-Based**: Modular React components with TypeScript
- **State Management**: React Context API for auth and socket
- **Routing**: React Router v6 for navigation
- **UI Library**: shadcn/ui components with TailwindCSS
- **API Communication**: RESTful API calls + WebSocket for real-time

### Backend Architecture

- **RESTful API**: Express.js routes for CRUD operations
- **WebSocket Server**: Socket.IO for real-time features
- **Database**: MongoDB with Mongoose ODM
- **File Storage**: Local file system (uploads directory)
- **AI Integration**: Google Gemini API for content generation

## 🛠️ Tech Stack

### Frontend

| Technology           | Purpose                           |
| -------------------- | --------------------------------- |
| **React 18**         | UI framework                      |
| **TypeScript**       | Type-safe JavaScript              |
| **Vite**             | Build tool and dev server         |
| **TailwindCSS**      | Utility-first CSS framework       |
| **shadcn/ui**        | Component library                 |
| **React Router v6**  | Client-side routing               |
| **Socket.io Client** | Real-time WebSocket communication |
| **TanStack Query**   | Data fetching and caching         |
| **React Hook Form**  | Form management                   |
| **Zod**              | Schema validation                 |
| **Lucide React**     | Icon library                      |

### Backend

| Technology           | Purpose                       |
| -------------------- | ----------------------------- |
| **Node.js**          | Runtime environment           |
| **Express.js**       | Web framework                 |
| **MongoDB**          | NoSQL database                |
| **Mongoose**         | MongoDB ODM                   |
| **Socket.io**        | WebSocket server              |
| **Multer**           | File upload handling          |
| **Razorpay**         | Payment gateway integration   |
| **Google Gemini AI** | AI content generation         |
| **GNews API**        | News feed integration         |
| **dotenv**           | Environment variables         |
| **CORS**             | Cross-origin resource sharing |

## 📦 Project Structure

```
peekuthon-education/
├── Backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Book.js               # Book schema
│   │   ├── Quiz.js               # Quiz schema
│   │   ├── Flashcard.js          # Flashcard schema
│   │   ├── Chat.js               # Chat history schema
│   │   ├── LearningResource.js  # Learning resource schema
│   │   ├── GameScore.js          # Game score schema
│   │   ├── ConceptAnimation.js  # Concept animation schema
│   │   ├── StudyRoom.js          # Study room schema
│   │   ├── Message.js            # Message schema
│   │   └── Course.js              # Course schema
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── books.js              # Book routes
│   │   ├── quizzes.js            # Quiz routes
│   │   ├── flashcards.js         # Flashcard routes
│   │   ├── chats.js              # Chat routes
│   │   ├── learningResources.js # Learning resource routes
│   │   ├── gameScores.js         # Game score routes
│   │   ├── concepts.js           # Concept routes
│   │   ├── studyRooms.js         # Study room routes
│   │   ├── courses.js            # Course routes
│   │   ├── news.js               # News routes
│   │   ├── payments.js           # Razorpay payment routes
│   │   └── ai.js                 # AI routes
│   ├── uploads/                  # File upload directory
│   ├── server.js                 # Express server + Socket.IO
│   ├── package.json
│   └── render.yaml               # Render deployment config
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── AppSidebar.tsx    # Main navigation sidebar
│   │   │   ├── NavLink.tsx       # Navigation link component
│   │   │   ├── games/            # Game components
│   │   │   │   ├── AptitudeTest.tsx
│   │   │   │   ├── Game2048.tsx
│   │   │   │   ├── GKTest.tsx
│   │   │   │   └── IQTest.tsx
│   │   │   ├── study-room/       # Study room components
│   │   │   │   ├── ChatBox.tsx
│   │   │   │   ├── NoteBoard.tsx
│   │   │   │   ├── Participants.tsx
│   │   │   │   └── RoomHeader.tsx
│   │   │   ├── icons/            # Custom icons
│   │   │   └── ui/               # shadcn/ui components
│   │   ├── contexts/
│   │   │   ├── AuthContext.tsx   # Authentication context
│   │   │   └── SocketContext.tsx # Socket.IO context
│   │   ├── hooks/
│   │   │   ├── use-mobile.tsx    # Mobile detection hook
│   │   │   └── use-toast.ts      # Toast notification hook
│   │   ├── lib/
│   │   │   ├── api.ts             # API helper functions
│   │   │   ├── api-config.ts     # API configuration
│   │   │   ├── study-room-api.ts # Study room API functions
│   │   │   ├── sms.ts            # SMS utilities
│   │   │   └── utils.ts          # Utility functions
│   │   ├── pages/
│   │   │   ├── Index.tsx         # Dashboard (home)
│   │   │   ├── Dashboard.tsx     # Main dashboard component
│   │   │   ├── Auth.tsx          # Login/Register
│   │   │   ├── ReadBook.tsx      # Book generator
│   │   │   ├── QuestionBot.tsx   # AI question bot
│   │   │   ├── QuizGenerator.tsx # Quiz generator
│   │   │   ├── FlashCardGenerator.tsx # Flashcard generator
│   │   │   ├── ConceptAnimator.tsx   # Concept animator
│   │   │   ├── LearningResourceGenerator.tsx # Resource generator
│   │   │   ├── CourseGenerator.tsx    # Course generator
│   │   │   ├── FlowchartGenerator.tsx # Flowchart generator
│   │   │   ├── HearAndLearn.tsx  # Audio learning
│   │   │   ├── GameZone.tsx      # Game zone hub
│   │   │   ├── StudyRoomsList.tsx # Study rooms list
│   │   │   ├── StudyRoom.tsx     # Individual study room
│   │   │   ├── LiveDoubtSession.tsx # Live doubt session
│   │   │   ├── News.tsx          # News feed
│   │   │   ├── Profile.tsx       # User profile
│   │   │   ├── FeatureDetail.tsx # Feature details
│   │   │   ├── ComingSoon.tsx    # Coming soon page
│   │   │   └── NotFound.tsx       # 404 page
│   │   ├── types/
│   │   │   └── study-room.ts     # TypeScript types
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── public/                   # Static assets
│   ├── package.json
│   ├── vite.config.ts            # Vite configuration
│   ├── tailwind.config.ts        # Tailwind configuration
│   └── tsconfig.json             # TypeScript configuration
│
├── README.md                     # This file
├── AI_FEATURES_GUIDE.md          # AI features documentation
├── PRESENTATION_CONTENT.md       # Presentation content
└── SETUP_SUMMARY.md              # Setup summary
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **MongoDB Atlas** account (free tier available)
- **Google Gemini API** key ([Get one here](https://makersuite.google.com/app/apikey))
- **GNews API** key (optional, for news feature)

### Installation

#### 1. Clone the Repository

```bash
git clone https://github.com/santhoshkumaritla/peekuthon-education.git
cd peekuthon-education
```

#### 2. Backend Setup

```bash
cd Backend
npm install

# Create .env file
cat > .env << EOF
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
GNEWS_API_KEY=your_gnews_api_key
FRONTEND_URL=http://localhost:5173
EOF

# Start backend server
npm run dev
```

The backend will run on `http://localhost:5000`

#### 3. Frontend Setup

```bash
cd frontend
npm install

# Create .env file
cat > .env << EOF
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_key
VITE_GEMINI_QUESTIONBOT_API_KEY=your_key
VITE_GEMINI_QUIZ_API_KEY=your_key
VITE_GEMINI_LEARNING_API_KEY=your_key
VITE_GEMINI_HEAR_API_KEY=your_key
VITE_GEMINI_FLASHCARD_API_KEY=your_key
VITE_GEMINI_CONCEPT_API_KEY=your_key
VITE_GEMINI_GAMES_API_KEY=your_key
EOF

# Start frontend dev server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 🌍 Deployment

### Backend Deployment (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: `Node`
4. Add environment variables:
   - `NODE_ENV=production`
   - `MONGODB_URI=your_mongodb_uri`
   - `PORT=5000`
   - `GEMINI_API_KEY=your_key`
   - `GNEWS_API_KEY=your_key`
   - `FRONTEND_URL=your_netlify_url`

### Frontend Deployment (Netlify)

1. Create a new site on [Netlify](https://netlify.com)
2. Connect your GitHub repository
3. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
4. Add environment variables (all VITE\_ prefixed variables)

## 📡 API Documentation

See [Backend/README.md](./Backend/README.md) for detailed API documentation.

### Quick Reference

#### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/:id` - Get user by ID
- `PATCH /api/auth/:id` - Update user profile

#### Study Rooms

- `GET /api/study-rooms` - List all active rooms
- `POST /api/study-rooms` - Create new room
- `GET /api/study-rooms/:id` - Get room details
- `POST /api/study-rooms/join` - Join room by code
- `POST /api/study-rooms/:id/leave` - Leave room
- `DELETE /api/study-rooms/:id` - Delete room

#### Resources

- `GET /api/books/user/:userId` - Get user's books
- `POST /api/books` - Create book
- `GET /api/quizzes/user/:userId` - Get user's quizzes
- `POST /api/quizzes` - Create quiz
- `GET /api/flashcards/user/:userId` - Get user's flashcards
- `POST /api/flashcards` - Create flashcards
- `GET /api/chats/user/:userId` - Get chat history
- `POST /api/chats` - Save chat messages
- `GET /api/learning-resources/user/:userId` - Get resources
- `POST /api/learning-resources` - Save resources
- `GET /api/game-scores/user/:userId` - Get game scores
- `POST /api/game-scores` - Save game score
- `GET /api/game-scores/leaderboard/:gameType` - Get leaderboard
- `GET /api/concepts/user/:userId` - Get concepts
- `POST /api/concepts` - Save concept
- `GET /api/courses?userId=:userId` - Get courses
- `POST /api/courses` - Create course
- `GET /api/news` - Get latest news

#### Payments

- `POST /api/payments/create-order` - Create Razorpay order for Live Doubt Session
- `POST /api/payments/verify-payment` - Verify payment signature and generate meeting link
- `GET /api/payments/payment/:paymentId` - Fetch payment details

#### File Upload

- `POST /api/upload` - Upload file (images, PDFs, documents)

## 🗄️ Database Schema

### User Model

```javascript
{
  studentName: String (required),
  studentMobile: String (required, unique),
  parentMobile: String (required),
  password: String (required),
  role: String (enum: ['student', 'parent', 'teacher'], default: 'student'),
  createdAt: Date
}
```

### StudyRoom Model

```javascript
{
  name: String (required, maxlength: 50),
  code: String (required, unique, length: 6, uppercase),
  createdBy: String (required),
  participants: [{
    userId: String,
    username: String,
    joinedAt: Date,
    studyTime: Number (minutes),
    isActive: Boolean
  }],
  notes: [{
    content: String,
    createdBy: String,
    username: String,
    createdAt: Date,
    updatedAt: Date
  }],
  maxParticipants: Number (default: 10, min: 2, max: 50),
  isActive: Boolean (default: true),
  createdAt: Date,
  updatedAt: Date
}
```

### Message Model

```javascript
{
  roomId: String (required),
  userId: String (required),
  username: String (required),
  content: String (required),
  type: String (enum: ['user', 'system', 'file']),
  fileUrl: String,
  fileName: String,
  fileType: String,
  fileSize: Number,
  timestamp: Date (default: now)
}
```

See [Backend/README.md](./Backend/README.md) for complete schema documentation.

## 🔌 Real-time Features

### Socket.IO Events

#### Client → Server

- `joinRoom` - Join a study room
- `leaveRoom` - Leave a study room
- `sendMessage` - Send a message to room
- `addNote` - Add a note to board
- `updateNote` - Update a note
- `deleteNote` - Delete a note
- `updateStudyTime` - Update study time

#### Server → Client

- `userJoined` - User joined the room
- `userLeft` - User left the room
- `newMessage` - New message received
- `noteAdded` - Note added to board
- `noteUpdated` - Note updated
- `noteDeleted` - Note deleted
- `studyTimeUpdated` - Study time updated

### AI Integration in Study Rooms

Mention `@ai` in any message to trigger the AI assistant:

- Analyzes the question with conversation context
- Supports image and PDF analysis
- Provides educational responses
- Responses saved as messages

## 📚 Component Guide

### Frontend Components

#### Pages

- **Dashboard** (`Dashboard.tsx`): Main dashboard with stats and analytics
- **StudyRoom** (`StudyRoom.tsx`): Individual study room with chat, notes, participants
- **QuestionBot** (`QuestionBot.tsx`): AI-powered question answering
- **QuizGenerator** (`QuizGenerator.tsx`): Generate and take quizzes
- **GameZone** (`GameZone.tsx`): Hub for all games

#### Study Room Components

- **ChatBox** (`ChatBox.tsx`): Real-time chat interface
- **NoteBoard** (`NoteBoard.tsx`): Collaborative note-taking
- **Participants** (`Participants.tsx`): Active participants list
- **RoomHeader** (`RoomHeader.tsx`): Room information and controls

#### Context Providers

- **AuthContext** (`AuthContext.tsx`): Authentication state management
- **SocketContext** (`SocketContext.tsx`): Socket.IO connection management

See [frontend/README.md](./frontend/README.md) for detailed component documentation.

## 🔐 Environment Variables

### Backend (.env)

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
GNEWS_API_KEY=your_gnews_api_key
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)

```env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_SOCKET_URL=http://localhost:5000
VITE_GEMINI_API_KEY=your_key
VITE_GEMINI_QUESTIONBOT_API_KEY=your_key
VITE_GEMINI_QUIZ_API_KEY=your_key
VITE_GEMINI_LEARNING_API_KEY=your_key
VITE_GEMINI_HEAR_API_KEY=your_key
VITE_GEMINI_FLASHCARD_API_KEY=your_key
VITE_GEMINI_CONCEPT_API_KEY=your_key
VITE_GEMINI_GAMES_API_KEY=your_key
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Development Guidelines

- Follow TypeScript best practices
- Use ESLint for code quality
- Write descriptive commit messages
- Test your changes locally
- Update documentation as needed

## 📝 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **Google Gemini AI** for AI capabilities
- **shadcn/ui** for beautiful components
- **MongoDB Atlas** for database hosting
- **Render & Netlify** for deployment platforms
- **Socket.IO** for real-time communication
- **Vite** for fast development experience

## 📞 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ for better education**
