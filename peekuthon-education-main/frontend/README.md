# 🎨 Study Genie Frontend

Complete frontend documentation for the Study Genie education platform. Built with React, TypeScript, Vite, and TailwindCSS.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup](#setup)
- [Project Structure](#project-structure)
- [Components](#components)
- [Pages](#pages)
- [Contexts & Hooks](#contexts--hooks)
- [API Integration](#api-integration)
- [Routing](#routing)
- [Styling](#styling)
- [State Management](#state-management)
- [Real-time Features](#real-time-features)
- [Build & Deployment](#build--deployment)

## 🎯 Overview

The frontend is a modern React application featuring:
- **TypeScript** for type safety
- **Vite** for fast development and building
- **TailwindCSS** for utility-first styling
- **shadcn/ui** for beautiful, accessible components
- **React Router** for client-side routing
- **Socket.io Client** for real-time communication
- **TanStack Query** for data fetching and caching

## 🏗️ Architecture

### Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 | UI framework |
| TypeScript | Type-safe JavaScript |
| Vite | Build tool and dev server |
| TailwindCSS | Utility-first CSS |
| shadcn/ui | Component library |
| React Router v6 | Client-side routing |
| Socket.io Client | WebSocket communication |
| TanStack Query | Data fetching |
| React Hook Form | Form management |
| Zod | Schema validation |

### Application Flow

```
App.tsx
├── AuthProvider (Authentication Context)
├── SocketProvider (Socket.IO Context)
└── AppContent
    └── BrowserRouter
        ├── Auth Page (Public)
        └── Protected Routes
            ├── SidebarProvider
            ├── AppSidebar
            └── Main Content (Pages)
```

## 🚀 Setup

### Prerequisites

- Node.js v18+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Environment Variables

Create a `.env` file:

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

### Running the Development Server

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

### Building for Production

```bash
npm run build
```

Output directory: `dist/`

## 📦 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── AppSidebar.tsx   # Main navigation
│   │   ├── NavLink.tsx      # Navigation link
│   │   ├── games/           # Game components
│   │   ├── study-room/      # Study room components
│   │   ├── icons/           # Custom icons
│   │   └── ui/              # shadcn/ui components
│   ├── contexts/            # React contexts
│   │   ├── AuthContext.tsx  # Authentication
│   │   └── SocketContext.tsx # Socket.IO
│   ├── hooks/               # Custom hooks
│   │   ├── use-mobile.tsx    # Mobile detection
│   │   └── use-toast.ts     # Toast notifications
│   ├── lib/                 # Utilities
│   │   ├── api.ts           # API functions
│   │   ├── api-config.ts   # API config
│   │   ├── study-room-api.ts # Study room API
│   │   ├── sms.ts           # SMS utilities
│   │   └── utils.ts         # Helper functions
│   ├── pages/               # Page components
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # Entry point
│   └── index.css            # Global styles
├── public/                  # Static assets
├── package.json
├── vite.config.ts           # Vite config
├── tailwind.config.ts       # Tailwind config
└── tsconfig.json            # TypeScript config
```

## 🧩 Components

### Core Components

#### AppSidebar (`components/AppSidebar.tsx`)

Main navigation sidebar with:
- Collapsible design
- Main navigation items
- Tools section
- User info display
- Logout functionality

**Props:** None (uses `useAuth` hook)

**Features:**
- Responsive collapse/expand
- Active route highlighting
- User information display

#### NavLink (`components/NavLink.tsx`)

Custom navigation link component with active state.

**Props:**
```typescript
{
  to: string;
  end?: boolean;
  className?: string;
  activeClassName?: string;
  children: React.ReactNode;
}
```

### Study Room Components

#### ChatBox (`components/study-room/ChatBox.tsx`)

Real-time chat interface for study rooms.

**Props:**
```typescript
{
  messages: Message[];
  onSendMessage: (content: string, fileData?: FileData) => void;
  currentUserId: string;
}
```

**Features:**
- Real-time message display
- File/image sharing
- AI assistant integration (@ai mentions)
- Auto-scroll to latest message
- Message timestamps

#### NoteBoard (`components/study-room/NoteBoard.tsx`)

Collaborative note-taking board.

**Props:**
```typescript
{
  notes: Note[];
  onAddNote: (content: string) => void;
  onUpdateNote: (noteId: string, content: string) => void;
  onDeleteNote: (noteId: string) => void;
  currentUserId: string;
}
```

**Features:**
- Real-time note synchronization
- Add/edit/delete notes
- User attribution
- Timestamps

#### Participants (`components/study-room/Participants.tsx`)

Display active participants in the study room.

**Props:**
```typescript
{
  participants: Participant[];
  currentUserId: string;
}
```

**Features:**
- Active participant list
- Study time display
- Join time information
- User avatars

#### RoomHeader (`components/study-room/RoomHeader.tsx`)

Room information and controls.

**Props:**
```typescript
{
  room: Room;
  onLeave: () => void;
  onCopyCode: () => void;
}
```

**Features:**
- Room name and code display
- Copy room code button
- Leave room button
- Participant count

### Game Components

#### IQTest (`components/games/IQTest.tsx`)

Intelligence quotient test component.

**Features:**
- Multiple question types
- Score calculation
- Timer
- Results display

#### AptitudeTest (`components/games/AptitudeTest.tsx`)

Aptitude test component.

**Features:**
- Problem-solving questions
- Score tracking
- Performance analytics

#### GKTest (`components/games/GKTest.tsx`)

General knowledge test component.

**Features:**
- Various categories
- Score tracking
- Leaderboard integration

#### Game2048 (`components/games/Game2048.tsx`)

Classic 2048 puzzle game.

**Features:**
- Game board
- Score tracking
- Win/lose detection
- Restart functionality

### UI Components

All shadcn/ui components are located in `components/ui/`:
- Button, Card, Input, Textarea
- Dialog, Sheet, Drawer
- Tabs, Accordion, Alert
- Toast, Sonner
- And many more...

## 📄 Pages

### Dashboard (`pages/Dashboard.tsx`)

Main dashboard showing user statistics and activity.

**Features:**
- Total counts (books, quizzes, flashcards, etc.)
- Recent activity display
- Activity heatmap (7 days)
- Performance metrics
- Quick access to features

**Data Fetched:**
- Books, Quizzes, Flashcards, Chats
- Concepts, Game Scores, Resources, Courses

### Auth (`pages/Auth.tsx`)

Authentication page with login and registration.

**Features:**
- Login form
- Registration form
- Form validation
- Error handling
- Redirect after authentication

### Study Rooms

#### StudyRoomsList (`pages/StudyRoomsList.tsx`)

List of all available study rooms.

**Features:**
- Display all active rooms
- Create new room
- Join room by code
- Room search/filter

#### StudyRoom (`pages/StudyRoom.tsx`)

Individual study room page.

**Features:**
- Real-time chat
- Collaborative note board
- Participant list
- File sharing
- AI assistant integration
- Study time tracking

**Socket Events Used:**
- `joinRoom`, `leaveRoom`
- `sendMessage`, `newMessage`
- `addNote`, `updateNote`, `deleteNote`
- `updateStudyTime`

### Learning Tools

#### ReadBook (`pages/ReadBook.tsx`)

AI-powered book generator.

**Features:**
- Topic input
- Book generation with Gemini AI
- Two-page spread layout
- Save generated books
- View saved books

#### QuestionBot (`pages/QuestionBot.tsx`)

AI question-answering assistant.

**Features:**
- Chat interface
- Conversation history
- Context-aware responses
- Save conversations

#### QuizGenerator (`pages/QuizGenerator.tsx`)

Generate and take quizzes.

**Features:**
- Topic and difficulty selection
- AI-generated questions
- Multiple choice format
- Score tracking
- Save quiz attempts

#### FlashCardGenerator (`pages/FlashCardGenerator.tsx`)

Create and study flashcards.

**Features:**
- Topic input
- AI-generated flashcards
- Flip animation
- Study mode
- Save flashcard decks

#### ConceptAnimator (`pages/ConceptAnimator.tsx`)

Visualize concepts with animations.

**Features:**
- Topic input
- Step-by-step visualization
- Summary generation
- Save concepts

#### LearningResourceGenerator (`pages/LearningResourceGenerator.tsx`)

Generate learning resources.

**Features:**
- Topic input
- Curated resources (books, videos, websites, courses)
- External links
- Save resources

#### CourseGenerator (`pages/CourseGenerator.tsx`)

Generate structured courses.

**Features:**
- Course creation
- Module-based structure
- Progress tracking
- Completion status
- Save courses

#### FlowchartGenerator (`pages/FlowchartGenerator.tsx`)

Create visual flowcharts.

**Features:**
- Process visualization
- Interactive diagrams
- Export capabilities

#### HearAndLearn (`pages/HearAndLearn.tsx`)

Audio-based learning.

**Features:**
- Text-to-speech
- Audio playback
- Learning through listening

### Game Zone (`pages/GameZone.tsx`)

Hub for all games.

**Features:**
- Game selection
- Score display
- Leaderboard links
- Game statistics

### Other Pages

#### News (`pages/News.tsx`)

Educational news feed.

**Features:**
- Latest news articles
- Category filtering
- External links

#### Profile (`pages/Profile.tsx`)

User profile page.

**Features:**
- User information display
- Profile editing
- Statistics overview

#### LiveDoubtSession (`pages/LiveDoubtSession.tsx`)

Live doubt session (Coming Soon).

#### ComingSoon (`pages/ComingSoon.tsx`)

Placeholder for upcoming features.

#### NotFound (`pages/NotFound.tsx`)

404 error page.

## 🔌 Contexts & Hooks

### AuthContext (`contexts/AuthContext.tsx`)

Authentication state management.

**Provider:** `AuthProvider`

**Hook:** `useAuth()`

**State:**
```typescript
{
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
```

**Methods:**
- `login(studentMobile, password)` - Login user
- `register(userData)` - Register new user
- `logout()` - Logout user
- `setUser(user)` - Update user state

### SocketContext (`contexts/SocketContext.tsx`)

Socket.IO connection management.

**Provider:** `SocketProvider`

**Hook:** `useSocket()`

**State:**
```typescript
{
  socket: Socket | null;
  isConnected: boolean;
}
```

**Custom Hook:** `useSocketEvents(events)`
- Register socket event listeners
- Auto cleanup on unmount

**Example:**
```typescript
useSocketEvents({
  newMessage: (message) => {
    // Handle new message
  },
  userJoined: (data) => {
    // Handle user joined
  }
});
```

### Custom Hooks

#### use-mobile (`hooks/use-mobile.tsx`)

Detect mobile devices.

```typescript
const isMobile = useMobile();
```

#### use-toast (`hooks/use-toast.ts`)

Toast notification hook.

```typescript
const { toast } = useToast();

toast({
  title: "Success",
  description: "Operation completed"
});
```

## 🌐 API Integration

### API Client (`lib/api.ts`)

Centralized API functions for all endpoints.

**Available APIs:**
- `bookAPI` - Book operations
- `quizAPI` - Quiz operations
- `flashcardAPI` - Flashcard operations
- `chatAPI` - Chat operations
- `learningResourceAPI` - Resource operations
- `gameScoreAPI` - Game score operations
- `conceptAPI` - Concept operations
- `courseAPI` - Course operations

**Helper Functions:**
- `getCurrentUserId()` - Get current user ID from localStorage
- `apiCall(endpoint, options)` - Generic API call function

### Study Room API (`lib/study-room-api.ts`)

Specialized functions for study room operations.

**Functions:**
- `getRoomData(roomId, userId)` - Get room data
- `sendMessage(roomId, message)` - Send message (REST)
- `addNote(roomId, note)` - Add note (REST)
- `updateNote(roomId, noteId, content)` - Update note (REST)
- `deleteNote(roomId, noteId)` - Delete note (REST)
- `leaveRoom(roomId, userId)` - Leave room

### API Configuration (`lib/api-config.ts`)

API base URL configuration.

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
```

## 🛣️ Routing

### Route Structure

```typescript
/                    → Dashboard (Index)
/auth                → Auth (Login/Register)
/read-book           → ReadBook
/question-bot        → QuestionBot
/quiz-generator      → QuizGenerator
/flashcards          → FlashCardGenerator
/concept-animator    → ConceptAnimator
/recommendations     → LearningResourceGenerator
/course-generator    → CourseGenerator
/flowchart-generator → FlowchartGenerator
/hear-and-learn      → HearAndLearn
/game-zone           → GameZone
/study-rooms         → StudyRoomsList
/study-room/:roomId  → StudyRoom
/news                → News
/profile             → Profile
/live-doubt          → LiveDoubtSession
/feature/:featureId  → FeatureDetail
*                    → NotFound
```

### Protected Routes

All routes except `/auth` are protected. Unauthenticated users are redirected to `/auth`.

**Implementation:**
```typescript
<ProtectedRoute>
  {/* Protected content */}
</ProtectedRoute>
```

## 🎨 Styling

### TailwindCSS

Utility-first CSS framework. Configuration in `tailwind.config.ts`.

**Custom Colors:**
- Primary, Secondary
- Sidebar colors
- Theme colors

### shadcn/ui

Component library with TailwindCSS. Components in `components/ui/`.

**Usage:**
```typescript
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
```

### Global Styles

`index.css` contains:
- TailwindCSS directives
- Custom CSS variables
- Global styles
- Dark mode support

## 📊 State Management

### Local State

- React `useState` for component-level state
- React `useEffect` for side effects

### Context API

- `AuthContext` - Authentication state
- `SocketContext` - Socket.IO connection

### Data Fetching

- TanStack Query for server state
- Custom hooks for API calls
- Manual fetch for some components

### Form Management

- React Hook Form for form handling
- Zod for schema validation

## 🔌 Real-time Features

### Socket.IO Integration

**Connection:**
- Auto-connects on app load
- Reconnection on disconnect
- Connection status tracking

**Study Room Events:**
- Join/leave rooms
- Send/receive messages
- Note board synchronization
- Participant updates
- Study time tracking

**AI Assistant:**
- Mention `@ai` in messages
- AI analyzes question and context
- Supports file attachments (images, PDFs)
- Responses broadcast to room

### Example Usage

```typescript
const { socket, isConnected } = useSocket();

useEffect(() => {
  if (socket && isConnected) {
    socket.emit('joinRoom', { roomId, userId, username });
    
    socket.on('newMessage', (message) => {
      // Handle new message
    });
    
    return () => {
      socket.off('newMessage');
      socket.emit('leaveRoom', { roomId, userId });
    };
  }
}, [socket, isConnected, roomId]);
```

## 🏗️ Build & Deployment

### Development

```bash
npm run dev
```

- Fast HMR (Hot Module Replacement)
- TypeScript checking
- ESLint warnings

### Production Build

```bash
npm run build
```

**Output:**
- `dist/` directory
- Optimized and minified
- Code splitting
- Asset optimization

### Preview Production Build

```bash
npm run preview
```

### Deployment (Netlify)

1. Connect GitHub repository
2. Configure:
   - **Base directory**: `frontend`
   - **Build command**: `npm run build`
   - **Publish directory**: `frontend/dist`
3. Add environment variables
4. Deploy

### Environment Variables for Production

All `VITE_` prefixed variables need to be set in Netlify:
- `VITE_API_BASE_URL`
- `VITE_SOCKET_URL`
- All Gemini API keys

## 📝 TypeScript Types

### Study Room Types (`types/study-room.ts`)

```typescript
interface Room {
  _id: string;
  name: string;
  code: string;
  createdBy: string;
  participants: Participant[];
  notes: Note[];
  maxParticipants: number;
  isActive: boolean;
}

interface Message {
  _id: string;
  roomId: string;
  userId: string;
  username: string;
  content: string;
  type: 'user' | 'system' | 'file';
  fileUrl?: string;
  timestamp: Date;
}

interface Note {
  _id: string;
  content: string;
  createdBy: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}

interface Participant {
  userId: string;
  username: string;
  joinedAt: Date;
  studyTime: number;
  isActive: boolean;
}
```

## 🐛 Common Issues & Solutions

### Socket Connection Issues

**Problem:** Socket not connecting
**Solution:** Check `VITE_SOCKET_URL` environment variable

### API Errors

**Problem:** API calls failing
**Solution:** Verify `VITE_API_BASE_URL` and backend server status

### Build Errors

**Problem:** TypeScript errors
**Solution:** Run `npm run build` to see detailed errors

### CORS Issues

**Problem:** CORS errors in browser
**Solution:** Ensure backend CORS is configured for frontend URL

## 📚 Additional Resources

- [React Documentation](https://react.dev)
- [TypeScript Documentation](https://www.typescriptlang.org)
- [Vite Documentation](https://vitejs.dev)
- [TailwindCSS Documentation](https://tailwindcss.com)
- [shadcn/ui Documentation](https://ui.shadcn.com)
- [Socket.IO Client Documentation](https://socket.io/docs/v4/client-api)

---

**For backend documentation, see [../Backend/README.md](../Backend/README.md)**
