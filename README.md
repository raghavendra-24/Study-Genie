# Study-Genie 🎓

A comprehensive full-stack AI-powered education platform designed to revolutionize learning through interactive tools, collaborative spaces, and gamified assessments.

## 📚 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Backend Setup](#backend-setup)
- [Frontend Setup](#frontend-setup)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Real-time Features](#real-time-features)
- [Live Demo](#live-demo)
- [Contributing](#contributing)

## 🌐 Overview

Study-Genie is an AI-powered educational platform that combines cutting-edge technology with effective pedagogical methods. It provides students with comprehensive tools to enhance learning, collaborate with peers, and track their progress through an intuitive dashboard.

### Key Highlights

- **AI-Powered Content Generation** using Google Gemini
- **Real-time Collaboration** with WebSocket support
- **Gamified Learning** with interactive games and quizzes
- **Responsive Design** with modern UI components
- **Secure Authentication** with user management
- **Payment Integration** with Razorpay

## ✨ Features

### 📖 AI-Powered Learning Tools

1. **📚 Read Book**
   - Generate comprehensive digital books on any topic
   - Two-page spread layout for immersive reading
   - Save and revisit generated books
   - AI-powered content using Google Gemini

2. **🤖 Question Bot**
   - Interactive AI assistant for learning queries
   - Conversation history per user
   - Context-aware responses
   - Follow-up question support

3. **❓ Quiz Generator**
   - Generate quizzes on any topic
   - Customizable difficulty levels
   - Multiple choice questions with instant feedback
   - Score tracking and performance analytics

4. **🃏 Flashcard Generator**
   - Create interactive flashcard decks
   - Front/back card format
   - Topic-based organization
   - Study mode with flip animations

5. **✨ Concept Animator**
   - Visualize complex concepts step-by-step
   - Topic summaries and explanations
   - Interactive learning experience

6. **📚 Learning Resource Generator**
   - Curated educational resources
   - Books, videos, websites, courses
   - Topic-based recommendations

7. **📖 Course Generator**
   - Structured course generation
   - Module-based learning paths
   - Progress tracking
   - Completion certificates

8. **📊 Flowchart Generator**
   - Visual flowchart creation
   - Process and concept diagrams
   - Export capabilities

9. **🎧 Hear and Learn**
   - Audio-based learning experience
   - Text-to-speech functionality
   - Listen to generated content

### 🎮 Game Zone

- **IQ Test**: Standardized intelligence assessment
- **Aptitude Test**: Problem-solving skill evaluation
- **GK Test**: General knowledge challenges
- **2048 Game**: Classic puzzle game with scoring
- **Leaderboards**: Global and personal score tracking

### 👥 Collaboration Features

1. **Study Rooms**
   - Create or join virtual study spaces
   - Unique 6-character room codes
   - Participant management (max 50 per room)
   - Real-time synchronization

2. **💬 Real-time Chat**
   - Live messaging with participants
   - File and image sharing
   - AI assistant integration (@ai mentions)
   - Persistent message history

3. **📝 Collaborative Notes**
   - Shared note-taking
   - Real-time updates
   - Edit and delete capabilities
   - User attribution

4. **📤 Media Sharing**
   - Upload images, PDFs, documents
   - Share files in chat
   - File management

5. **📰 News Feed**
   - Educational news and updates
   - Category filtering
   - Trending topics

6. **👤 User Profiles**
   - Track learning progress
   - View achievements
   - Performance analytics
   - Study statistics

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Real-time**: Socket.IO
- **AI**: Google Generative AI (Gemini)
- **Authentication**: JWT
- **Payments**: Razorpay
- **File Upload**: Multer
- **Environment**: dotenv

### Frontend
- **Framework**: React 18+ with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI
- **Routing**: React Router v6
- **State Management**: TanStack React Query
- **Socket.IO**: Real-time communication
- **Forms**: React Hook Form
- **Icons**: Lucide React
- **Deployment**: Netlify

### DevOps & Deployment
- **Backend**: Render.com (render.yaml)
- **Frontend**: Netlify
- **Version Control**: Git

## 📁 Project Structure

```
Study-Genie/
├── Backend/
│   ├── config/
│   │   └── db.js              # MongoDB connection config
│   ├── models/                # Database schemas
│   │   ├── User.js
│   │   ├── Book.js
│   │   ├── Quiz.js
│   │   ├── Flashcard.js
│   │   ├── Chat.js
│   │   ├── Course.js
│   │   ├── Message.js
│   │   ├── StudyRoom.js
│   │   ├── GameScore.js
│   │   ├── LearningResource.js
│   │   └── ConceptAnimation.js
│   ├── routes/                # API endpoints
│   │   ├── auth.js            # Authentication
│   │   ├── books.js           # Book operations
│   │   ├── quizzes.js         # Quiz management
│   │   ├── flashcards.js      # Flashcard operations
│   │   ├── chats.js           # Chat/QA operations
│   │   ├── concepts.js        # Concept animations
│   │   ├── courses.js         # Course generation
│   │   ├── ai.js              # AI endpoints
│   │   ├── studyRooms.js      # Study room management
│   │   ├── gameScores.js      # Game scoring
│   │   ├── learningResources.js # Resource management
│   │   ├── news.js            # News feed
│   │   └── payments.js        # Payment processing
│   ├── server.js              # Express app setup, Socket.IO config
│   ├── package.json
│   └── render.yaml            # Render deployment config
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── ui/             # Shadcn/UI components
    │   │   ├── games/          # Game components (IQ, Aptitude, GK, 2048)
    │   │   ├── study-room/     # Study room components (Chat, Notes, Participants)
    │   │   └── AppSidebar.tsx
    │   ├── pages/              # Route pages
    │   │   ├── Auth.tsx
    │   │   ├── Dashboard.tsx
    │   │   ├── ReadBook.tsx
    │   │   ├── QuestionBot.tsx
    │   │   ├── ConceptAnimator.tsx
    │   │   ├── QuizGenerator.tsx
    │   │   ├── FlashCardGenerator.tsx
    │   │   ├── CourseGenerator.tsx
    │   │   ├── FlowchartGenerator.tsx
    │   │   ├── GameZone.tsx
    │   │   ├── StudyRoom.tsx
    │   │   ├── Profile.tsx
    │   │   ├── News.tsx
    │   │   └── HearAndLearn.tsx
    │   ├── contexts/           # React contexts
    │   │   ├── AuthContext.tsx
    │   │   └── SocketContext.tsx
    │   ├── hooks/              # Custom hooks
    │   │   ├── use-mobile.tsx
    │   │   └── use-toast.ts
    │   ├── lib/                # Utilities & API
    │   │   ├── api.ts          # Main API client
    │   │   ├── api-config.ts
    │   │   ├── study-room-api.ts
    │   │   └── utils.ts
    │   ├── types/              # TypeScript types
    │   │   └── study-room.ts
    │   ├── App.tsx             # Root component
    │   ├── main.tsx            # Entry point
    │   └── index.css
    ├── public/                 # Static assets
    ├── package.json
    ├── tailwind.config.ts
    ├── tsconfig.json
    ├── vite.config.ts
    └── netlify.toml            # Netlify deployment config
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB Atlas account
- Google Gemini API key
- Razorpay API keys (optional, for payments)

### Environment Variables

#### Backend (.env)
```
MONGODB_URI=your_mongodb_connection_string
GEMINI_API_KEY=your_google_gemini_api_key
FRONTEND_URL=http://localhost:5173
PORT=5000
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

#### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
```

## 🔧 Backend Setup

1. **Navigate to Backend directory:**
```bash
cd Backend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
# Create .env file with required variables
cp .env.example .env
```

4. **Start the server:**
```bash
# Development with auto-reload
npm run dev

# Production
npm start
```

The server will run on `http://localhost:5000`

## 🎨 Frontend Setup

1. **Navigate to Frontend directory:**
```bash
cd frontend
```

2. **Install dependencies:**
```bash
npm install
```

3. **Configure environment variables:**
```bash
# Create .env file
cp .env.example .env
```

4. **Start development server:**
```bash
npm run dev
```

5. **Build for production:**
```bash
npm run build
```

The frontend will run on `http://localhost:5173`

## 📡 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/profile` - Get user profile

### Learning Tools
- `POST /api/books/generate` - Generate book
- `POST /api/quizzes/generate` - Generate quiz
- `POST /api/flashcards/generate` - Generate flashcards
- `POST /api/chats/ask` - Question bot query
- `POST /api/concepts/generate` - Concept animation
- `POST /api/courses/generate` - Course generation
- `POST /api/ai/ask` - General AI query

### Study Rooms
- `POST /api/study-rooms` - Create study room
- `GET /api/study-rooms` - Get all rooms
- `GET /api/study-rooms/:code` - Join study room
- `POST /api/study-rooms/:code/leave` - Leave study room

### Gamification
- `POST /api/game-scores` - Save game score
- `GET /api/game-scores/leaderboard` - Get leaderboard

## 🗄️ Database Schema

### User Model
- `_id`: ObjectId
- `name`: String
- `email`: String (unique)
- `password`: String (hashed)
- `avatar`: String
- `joinedAt`: Date
- `totalScore`: Number
- `achievements`: Array

### Book Model
- `_id`: ObjectId
- `title`: String
- `topic`: String
- `content`: String
- `userId`: ObjectId (ref: User)
- `createdAt`: Date
- `pages`: Array

### Quiz Model
- `_id`: ObjectId
- `title`: String
- `topic`: String
- `questions`: Array
- `userId`: ObjectId
- `scores`: Array

### StudyRoom Model
- `_id`: ObjectId
- `code`: String (unique)
- `title`: String
- `participants`: Array
- `messages`: Array (ref: Message)
- `notes`: Array
- `createdAt`: Date

## 🔌 Real-time Features

Socket.IO events for real-time communication:

### Chat Events
- `join_room` - Join study room
- `leave_room` - Leave study room
- `send_message` - Send chat message
- `receive_message` - Receive new message
- `update_notes` - Update collaborative notes
- `update_participants` - Update participant list

## 🌐 Live Demo

- **Frontend**: [Study-Genie App](https://peekuthon-eduplatform.netlify.app)
- **Backend API**: [https://peekuthon-education.onrender.com](https://peekuthon-education.onrender.com)

## 📦 Dependencies

### Backend Key Dependencies
- express (v4.18.2)
- mongoose (v8.0.0)
- socket.io (v4.7.0)
- @google/generative-ai (v0.24.1)
- razorpay (v2.9.6)
- multer (v1.4.5)
- cors (v2.8.5)

### Frontend Key Dependencies
- react (v18+)
- react-router-dom (v6+)
- socket.io-client (v4+)
- tailwindcss (v3+)
- @radix-ui/* (latest)
- shadcn/ui (latest)
- @tanstack/react-query (v5+)
- react-hook-form (v7+)

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB Atlas credentials are correct
- Whitelist your IP in MongoDB Atlas
- Check database URL format

### Gemini API Errors
- Verify API key is valid and active
- Check API quota limits
- Ensure proper error handling in requests

### Socket.IO Connection Issues
- Verify both backend and frontend URLs match
- Check CORS settings
- Ensure WebSocket support is enabled

### Frontend Build Issues
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear build cache: `rm -rf dist`
- Check Node version compatibility (v16+)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Standards
- Use TypeScript for type safety
- Follow ESLint configuration
- Add comments for complex logic
- Test features before pushing

## 📝 License

This project is licensed under the ISC License - see LICENSE file for details.

## 👨‍💻 Authors

- **Raghavendra** - [@raghavendra-24](https://github.com/raghavendra-24)

## 🙏 Acknowledgments

- Google Generative AI for AI capabilities
- Radix UI & shadcn/ui for UI components
- Tailwind CSS for styling
- Socket.IO for real-time features
- All contributors and users

## 📞 Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Contact the development team

---

**Built with ❤️ for better learning**
