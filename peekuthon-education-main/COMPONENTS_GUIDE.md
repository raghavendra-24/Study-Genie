# 🧩 Study Genie Components Guide

Comprehensive guide to understanding all major components and features in the Study Genie platform.

## 📋 Table of Contents

- [Study Room Components](#study-room-components)
- [AI-Powered Learning Tools](#ai-powered-learning-tools)
- [Game Components](#game-components)
- [Dashboard Components](#dashboard-components)
- [Authentication Flow](#authentication-flow)
- [Real-time Communication](#real-time-communication)
- [File Upload System](#file-upload-system)

## 🏠 Study Room Components

### Overview

Study Rooms are collaborative virtual spaces where students can study together in real-time. The system uses Socket.IO for real-time synchronization.

### Component Architecture

```
StudyRoom (Page)
├── RoomHeader
│   ├── Room name & code display
│   ├── Copy code button
│   └── Leave room button
├── Tabs Container
│   ├── Chat Tab
│   │   └── ChatBox
│   │       ├── Messages list
│   │       ├── Message input
│   │       ├── File upload button
│   │       └── AI assistant trigger (@ai)
│   ├── Notes Tab
│   │   └── NoteBoard
│   │       ├── Notes grid/list
│   │       ├── Add note button
│   │       └── Edit/delete controls
│   └── Participants Tab
│       └── Participants
│           ├── Active users list
│           ├── Study time display
│           └── Join time info
```

### How Study Rooms Work

#### 1. Room Creation
- User clicks "Create Room" in StudyRoomsList
- Backend generates unique 6-character code (e.g., "ABC123")
- Room is saved to database with creator info
- User is automatically added as first participant

#### 2. Joining a Room
- User enters room code or clicks on room
- Frontend calls `/api/study-rooms/join` endpoint
- Socket.IO emits `joinRoom` event
- Backend adds user to participants array
- System message broadcast: "User joined the room"

#### 3. Real-time Chat
- User types message and clicks send
- Socket.IO emits `sendMessage` event
- Backend saves message to database
- Socket.IO broadcasts `newMessage` to all room participants
- All clients receive and display the message

#### 4. AI Assistant Integration
- User types message containing "@ai"
- Message is sent normally first
- Backend detects "@ai" in content
- Extracts question (removes "@ai")
- Gets recent conversation context (last 5 messages)
- Processes attached files if present (images, PDFs)
- Calls Google Gemini API with context and question
- Generates AI response
- Saves AI response as message
- Broadcasts AI response to room

#### 5. Note Board
- User clicks "Add Note"
- Note is added locally
- Socket.IO emits `addNote` event
- Backend saves note to room's notes array
- Socket.IO broadcasts `noteAdded` to all participants
- All clients update their note boards

#### 6. File Sharing
- User clicks file upload button
- File is selected and uploaded to `/api/upload`
- Backend saves file to `uploads/` directory
- File URL is returned
- File data is included in message
- Message with file is sent via Socket.IO
- All participants see the file/image

#### 7. Study Time Tracking
- Timer starts when user joins room
- Every 60 seconds, study time is updated
- Socket.IO emits `updateStudyTime` event
- Backend updates participant's studyTime
- Socket.IO broadcasts update to room
- Participants list shows updated study times

### Key Files

- **Page**: `frontend/src/pages/StudyRoom.tsx`
- **Components**: 
  - `frontend/src/components/study-room/ChatBox.tsx`
  - `frontend/src/components/study-room/NoteBoard.tsx`
  - `frontend/src/components/study-room/Participants.tsx`
  - `frontend/src/components/study-room/RoomHeader.tsx`
- **API**: `frontend/src/lib/study-room-api.ts`
- **Backend Routes**: `Backend/routes/studyRooms.js`
- **Socket Events**: `Backend/server.js` (Socket.IO handlers)

---

## 🤖 AI-Powered Learning Tools

### Overview

All learning tools use Google Gemini AI to generate educational content. Each tool has its own API key for rate limiting and organization.

### 1. Read Book Generator

**Component**: `pages/ReadBook.tsx`

**How it works:**
1. User enters a topic (e.g., "Quantum Physics")
2. Frontend calls Google Gemini API with topic
3. AI generates comprehensive book content
4. Content is formatted into pages with two-page spread layout
5. Book is saved to database via `/api/books`
6. User can view, read, and delete saved books

**API Key**: `VITE_GEMINI_API_KEY`

**Data Flow:**
```
User Input → Gemini API → Format Pages → Save to DB → Display
```

**Database Model**: `Book`
- `userId`: Owner
- `topic`: Book topic
- `pages`: Array of page objects with left/right content
- `createdAt`: Creation timestamp

### 2. Question Bot

**Component**: `pages/QuestionBot.tsx`

**How it works:**
1. User types a question
2. Frontend calls Google Gemini API with question
3. AI generates answer
4. Conversation is saved to database via `/api/chats`
5. Chat history is maintained per user

**API Key**: `VITE_GEMINI_QUESTIONBOT_API_KEY`

**Features:**
- Conversation history
- Context-aware responses
- Follow-up questions supported

**Database Model**: `Chat`
- `userId`: Owner
- `messages`: Array of user/assistant messages
- `createdAt`, `updatedAt`: Timestamps

### 3. Quiz Generator

**Component**: `pages/QuizGenerator.tsx`

**How it works:**
1. User enters topic and selects difficulty
2. Frontend calls Google Gemini API
3. AI generates multiple-choice questions
4. User takes quiz and answers questions
5. Score is calculated
6. Quiz attempt is saved via `/api/quizzes`

**API Key**: `VITE_GEMINI_QUIZ_API_KEY`

**Features:**
- Multiple difficulty levels
- Instant feedback
- Score tracking
- Performance analytics

**Database Model**: `Quiz`
- `userId`: Owner
- `topic`: Quiz topic
- `questions`: Array with question, options, correctAnswer, userAnswer
- `score`: User's score
- `totalQuestions`: Total questions count

### 4. Flashcard Generator

**Component**: `pages/FlashCardGenerator.tsx`

**How it works:**
1. User enters topic
2. Frontend calls Google Gemini API
3. AI generates flashcard pairs (front/back)
4. Flashcards are displayed with flip animation
5. Deck is saved via `/api/flashcards`

**API Key**: `VITE_GEMINI_FLASHCARD_API_KEY`

**Features:**
- Interactive flip animation
- Study mode
- Topic organization

**Database Model**: `Flashcard`
- `userId`: Owner
- `topic`: Flashcard topic
- `cards`: Array of {front, back} objects

### 5. Concept Animator

**Component**: `pages/ConceptAnimator.tsx`

**How it works:**
1. User enters concept/topic
2. Frontend calls Google Gemini API
3. AI generates step-by-step explanation
4. Concept is visualized with animations
5. Concept is saved via `/api/concepts`

**API Key**: `VITE_GEMINI_CONCEPT_API_KEY`

**Features:**
- Step-by-step visualization
- Summary generation
- Interactive learning

**Database Model**: `ConceptAnimation`
- `userId`: Owner
- `topic`: Concept topic
- `summary`: Overview
- `steps`: Array of step descriptions

### 6. Learning Resource Generator

**Component**: `pages/LearningResourceGenerator.tsx`

**How it works:**
1. User enters topic
2. Frontend calls Google Gemini API
3. AI generates curated resources (books, videos, websites, courses)
4. Resources are displayed with links
5. Resources are saved via `/api/learning-resources`

**API Key**: `VITE_GEMINI_LEARNING_API_KEY`

**Features:**
- Curated recommendations
- External links
- Multiple resource types

**Database Model**: `LearningResource`
- `userId`: Owner
- `topic`: Resource topic
- `resources`: Object with books, videos, websites, courses arrays

### 7. Course Generator

**Component**: `pages/CourseGenerator.tsx`

**How it works:**
1. User enters course topic
2. Frontend calls Google Gemini API
3. AI generates structured course with modules
4. User can mark modules as complete
5. Course is saved via `/api/courses`

**API Key**: Uses general Gemini API

**Features:**
- Module-based structure
- Progress tracking
- Completion status
- Course statistics

**Database Model**: `Course`
- `userId`: Owner
- `title`: Course title
- `description`: Course description
- `modules`: Array of {title, content, completed}
- `completed`: Overall completion status

### 8. Flowchart Generator

**Component**: `pages/FlowchartGenerator.tsx`

**How it works:**
1. User enters process/concept
2. Frontend calls Google Gemini API
3. AI generates flowchart structure
4. Flowchart is visualized
5. Can be exported

**Features:**
- Visual process representation
- Interactive diagrams
- Export capabilities

### 9. Hear and Learn

**Component**: `pages/HearAndLearn.tsx`

**How it works:**
1. User enters text/topic
2. Frontend calls Google Gemini API
3. AI generates content
4. Text-to-speech converts to audio
5. User listens to content

**API Key**: `VITE_GEMINI_HEAR_API_KEY`

**Features:**
- Audio playback
- Learning through listening
- Text-to-speech integration

---

## 🎮 Game Components

### Overview

Game Zone includes four types of games with score tracking and leaderboards.

### 1. IQ Test

**Component**: `components/games/IQTest.tsx`

**How it works:**
1. User starts test
2. Questions are displayed one by one
3. User selects answers
4. Timer tracks time
5. Score is calculated based on correct answers and time
6. Score is saved via `/api/game-scores`

**Features:**
- Multiple question types
- Timer
- Score calculation
- Results display

**Database**: `GameScore` with `gameType: 'iq-test'`

### 2. Aptitude Test

**Component**: `components/games/AptitudeTest.tsx`

**How it works:**
1. User starts test
2. Problem-solving questions displayed
3. User answers questions
4. Score calculated
5. Saved to database

**Features:**
- Logical reasoning questions
- Performance analytics
- Score tracking

**Database**: `GameScore` with `gameType: 'aptitude-test'`

### 3. GK Test

**Component**: `components/games/GKTest.tsx`

**How it works:**
1. User starts test
2. General knowledge questions displayed
3. User answers
4. Score calculated
5. Saved to database

**Features:**
- Various categories
- Score tracking
- Leaderboard integration

**Database**: `GameScore` with `gameType: 'gk-test'`

### 4. 2048 Game

**Component**: `components/games/Game2048.tsx`

**How it works:**
1. User starts game
2. Game board displayed (4x4 grid)
3. User moves tiles (arrow keys/swipe)
4. Tiles merge when same numbers touch
5. Score increases with merges
6. Game ends when board is full
7. Score saved to database

**Features:**
- Classic 2048 gameplay
- Score tracking
- Win/lose detection
- Restart functionality

**Database**: `GameScore` with `gameType: '2048'`

### Leaderboard System

**How it works:**
1. Scores are saved with `gameType`
2. Frontend calls `/api/game-scores/leaderboard/:gameType`
3. Backend returns top scores sorted by score
4. Leaderboard displays top players

---

## 📊 Dashboard Components

### Overview

Dashboard provides comprehensive overview of user's learning activities and progress.

### Component Structure

```
Dashboard
├── Header
│   ├── Welcome message
│   └── Refresh button
├── Stats Cards (4 cards)
│   ├── Books Generated
│   ├── Quizzes Taken
│   ├── Courses
│   └── AI Conversations
├── Tabs
│   ├── Overview Tab
│   │   ├── Activity Summary (7 cards)
│   │   ├── Recent Books
│   │   └── Recent Quiz Results
│   ├── Recent Activity Tab
│   │   ├── Recent AI Conversations
│   │   └── Recent Game Scores
│   └── Analytics Tab
│       ├── Activity Heatmap (7 days)
│       └── Learning Summary
```

### Data Fetching

Dashboard fetches data from multiple endpoints:
- `/api/books/user/:userId`
- `/api/quizzes/user/:userId`
- `/api/flashcards/user/:userId`
- `/api/chats/user/:userId`
- `/api/concepts/user/:userId`
- `/api/game-scores/user/:userId`
- `/api/learning-resources/user/:userId`
- `/api/courses/stats/:userId`
- `/api/courses?userId=:userId`

### Activity Heatmap

**How it works:**
1. Gets all user activities (books, quizzes, chats, games, etc.)
2. Groups by date (last 7 days)
3. Counts activities per day
4. Displays as colored grid
5. Color intensity based on activity count

**Color Scheme:**
- Gray: No activity
- Light green: 1-2 activities
- Medium green: 3-5 activities
- Dark green: 6-8 activities
- Very dark green: 9+ activities

### Auto-refresh

Dashboard auto-refreshes:
- Every 60 seconds
- When window regains focus
- Manual refresh button

---

## 🔐 Authentication Flow

### Overview

Simple authentication system using mobile number and password.

### Flow Diagram

```
User visits app
    ↓
Check localStorage for 'user'
    ↓
User exists?
    ├─ Yes → Set user state → Show app
    └─ No → Show Auth page
            ↓
        User logs in/registers
            ↓
        API call to /api/auth/login or /api/auth/register
            ↓
        Success?
            ├─ Yes → Save user to localStorage → Set user state → Redirect to dashboard
            └─ No → Show error message
```

### AuthContext

**Location**: `contexts/AuthContext.tsx`

**State:**
```typescript
{
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}
```

**Methods:**
- `login(mobile, password)` - Authenticate user
- `register(userData)` - Create new user
- `logout()` - Clear user and localStorage
- `setUser(user)` - Update user state

### Protected Routes

**Implementation**: `App.tsx`

```typescript
<ProtectedRoute>
  {/* Protected content */}
</ProtectedRoute>
```

**Behavior:**
- Checks `isAuthenticated` from AuthContext
- Shows loading spinner while checking
- Redirects to `/auth` if not authenticated
- Renders children if authenticated

### User Storage

User data is stored in:
- **localStorage**: Key `'user'`, JSON stringified
- **React State**: AuthContext state
- **Database**: MongoDB User collection

---

## 🔌 Real-time Communication

### Socket.IO Architecture

### Connection Flow

```
App Loads
    ↓
SocketProvider mounts
    ↓
Create Socket.IO client
    ↓
Connect to server (VITE_SOCKET_URL)
    ↓
Connection successful?
    ├─ Yes → Set isConnected = true
    └─ No → Retry connection (10 attempts)
```

### Socket Context

**Location**: `contexts/SocketContext.tsx`

**Provides:**
- `socket`: Socket.IO instance
- `isConnected`: Connection status

**Custom Hook**: `useSocketEvents(events)`
- Registers event listeners
- Auto cleanup on unmount
- Prevents memory leaks

### Study Room Real-time Events

#### Client → Server

1. **joinRoom**
   ```typescript
   socket.emit('joinRoom', {
     roomId: 'room_id',
     userId: 'user_id',
     username: 'John Doe'
   });
   ```

2. **sendMessage**
   ```typescript
   socket.emit('sendMessage', {
     roomId: 'room_id',
     userId: 'user_id',
     username: 'John Doe',
     content: 'Hello!',
     fileData: { /* optional */ }
   });
   ```

3. **addNote**
   ```typescript
   socket.emit('addNote', {
     roomId: 'room_id',
     note: { content: '...', createdBy: '...', username: '...' }
   });
   ```

#### Server → Client

1. **newMessage**
   - Received when any user sends a message
   - Updates messages list

2. **userJoined**
   - Received when user joins room
   - Updates participants list

3. **noteAdded**
   - Received when note is added
   - Updates note board

### Reconnection Handling

- Auto-reconnect on disconnect
- 10 reconnection attempts
- Exponential backoff
- Connection status displayed to user

---

## 📁 File Upload System

### Overview

File upload system for sharing images, PDFs, and documents in study rooms.

### Upload Flow

```
User selects file
    ↓
Frontend validates file (type, size)
    ↓
Create FormData with file
    ↓
POST to /api/upload
    ↓
Backend saves file to uploads/
    ↓
Returns file URL
    ↓
Include file data in message
    ↓
Send message via Socket.IO
    ↓
All participants receive file
```

### File Validation

**Frontend:**
- File type check
- File size check (10MB max)
- Preview before upload

**Backend:**
- Multer middleware validation
- File type whitelist
- File size limit (10MB)

### Supported File Types

- **Images**: jpeg, jpg, png, gif
- **Documents**: pdf, doc, docx, txt
- **Archives**: zip, rar

### File Storage

**Location**: `Backend/uploads/`

**Naming**: `{timestamp}-{originalname}`

**Example**: `1234567890-document.pdf`

### File Access

Files are served statically:
```
http://localhost:5000/uploads/filename.jpg
```

### AI File Analysis

When files are attached to messages containing "@ai":
1. File is read from uploads directory
2. Converted to base64
3. Sent to Gemini API with question
4. AI analyzes file content
5. Response includes file analysis

---

## 🔄 Data Flow Examples

### Creating a Book

```
User enters topic → ReadBook component
    ↓
Calls Gemini API (frontend)
    ↓
Receives generated content
    ↓
Formats into pages
    ↓
Calls POST /api/books
    ↓
Backend saves to MongoDB
    ↓
Returns saved book
    ↓
Frontend displays book
    ↓
User can read and save
```

### Joining a Study Room

```
User clicks room → StudyRoomsList
    ↓
Calls POST /api/study-rooms/join
    ↓
Backend adds user to participants
    ↓
Returns room data
    ↓
Frontend navigates to StudyRoom page
    ↓
Socket.IO emits joinRoom
    ↓
Backend broadcasts userJoined
    ↓
All participants see new user
```

### Sending a Message with AI

```
User types "@ai What is photosynthesis?"
    ↓
Socket.IO emits sendMessage
    ↓
Backend saves message
    ↓
Backend broadcasts newMessage
    ↓
All participants see message
    ↓
Backend detects "@ai"
    ↓
Extracts question
    ↓
Gets conversation context
    ↓
Calls Gemini API
    ↓
Generates AI response
    ↓
Saves AI message
    ↓
Broadcasts AI response
    ↓
All participants see AI answer
```

---

## 🎯 Best Practices

### Component Design

1. **Single Responsibility**: Each component has one clear purpose
2. **Reusability**: Components are designed to be reusable
3. **Props Interface**: Clear TypeScript interfaces for props
4. **Error Handling**: All components handle errors gracefully

### State Management

1. **Local State**: Use `useState` for component-specific state
2. **Context**: Use Context API for global state (auth, socket)
3. **Server State**: Use TanStack Query or manual fetch
4. **Real-time State**: Use Socket.IO events for live updates

### Performance

1. **Code Splitting**: Routes are code-split automatically
2. **Memoization**: Use `useMemo` and `useCallback` when needed
3. **Lazy Loading**: Components load on demand
4. **Optimistic Updates**: Update UI before server confirmation

### Error Handling

1. **Try-Catch**: Wrap API calls in try-catch
2. **Error Messages**: Display user-friendly error messages
3. **Fallbacks**: Provide fallback UI for errors
4. **Logging**: Log errors for debugging

---

## 📚 Additional Resources

- [Main README](../README.md) - Project overview
- [Backend README](../Backend/README.md) - Backend documentation
- [Frontend README](./frontend/README.md) - Frontend documentation

---

**This guide provides a comprehensive understanding of how all components work together in the Study Genie platform.**

