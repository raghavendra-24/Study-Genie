# 🔧 Study Genie Backend API

Complete backend API documentation for the Study Genie education platform. Built with Node.js, Express, MongoDB, and Socket.IO.

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture](#architecture)
- [Setup](#setup)
- [API Endpoints](#api-endpoints)
- [Database Models](#database-models)
- [Socket.IO Events](#socketio-events)
- [File Uploads](#file-uploads)
- [AI Integration](#ai-integration)
- [Error Handling](#error-handling)
- [Deployment](#deployment)

## 🎯 Overview

The backend provides:

- RESTful API endpoints for all features
- Real-time WebSocket communication via Socket.IO
- MongoDB database with Mongoose ODM
- File upload handling with Multer
- Google Gemini AI integration
- GNews API integration for news feed

## 🏗️ Architecture

```
Backend/
├── config/
│   └── db.js              # MongoDB connection
├── models/                # Mongoose schemas
├── routes/                # Express route handlers
├── uploads/              # File storage directory
├── server.js             # Main server file
└── package.json
```

### Server Structure

- **Express App**: HTTP server for REST API
- **HTTP Server**: Wraps Express for Socket.IO
- **Socket.IO Server**: Real-time WebSocket server
- **MongoDB Connection**: Persistent database connection
- **File Upload**: Multer middleware for file handling

## 🚀 Setup

### Prerequisites

- Node.js v18+
- MongoDB Atlas account or local MongoDB
- Google Gemini API key
- GNews API key (optional)

### Installation

```bash
cd Backend
npm install
```

### Environment Variables

Create a `.env` file:

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
GEMINI_API_KEY=your_gemini_api_key
GNEWS_API_KEY=your_gnews_api_key
FRONTEND_URL=http://localhost:5173
```

### Running the Server

```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

Server runs on `http://localhost:5000`

## 📡 API Endpoints

### Base URL

```
http://localhost:5000/api
```

### Authentication Routes (`/api/auth`)

#### Register User

```http
POST /api/auth/register
Content-Type: application/json

{
  "studentName": "John Doe",
  "studentMobile": "1234567890",
  "parentMobile": "0987654321",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "_id": "user_id",
    "studentName": "John Doe",
    "studentMobile": "1234567890",
    "parentMobile": "0987654321",
    "role": "student",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Login User

```http
POST /api/auth/login
Content-Type: application/json

{
  "studentMobile": "1234567890",
  "password": "password123"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Login successful",
  "data": {
    "_id": "user_id",
    "studentName": "John Doe",
    "studentMobile": "1234567890",
    "parentMobile": "0987654321",
    "role": "student"
  }
}
```

#### Get User by ID

```http
GET /api/auth/:id
```

#### Update User Profile

```http
PATCH /api/auth/:id
Content-Type: application/json

{
  "studentName": "Updated Name",
  "parentMobile": "new_mobile"
}
```

---

### Book Routes (`/api/books`)

#### Create Book

```http
POST /api/books
Content-Type: application/json

{
  "userId": "user_id",
  "topic": "Mathematics",
  "pages": [
    {
      "pageNumber": 1,
      "leftContent": "Introduction...",
      "rightContent": "Chapter 1..."
    }
  ]
}
```

#### Get User's Books

```http
GET /api/books/user/:userId
```

#### Get Book by ID

```http
GET /api/books/:id
```

#### Delete Book

```http
DELETE /api/books/:id
```

---

### Quiz Routes (`/api/quizzes`)

#### Create Quiz

```http
POST /api/quizzes
Content-Type: application/json

{
  "userId": "user_id",
  "topic": "Science",
  "questions": [
    {
      "question": "What is H2O?",
      "options": ["Water", "Oxygen", "Hydrogen", "Salt"],
      "correctAnswer": 0
    }
  ],
  "score": 8,
  "totalQuestions": 10
}
```

#### Get User's Quizzes

```http
GET /api/quizzes/user/:userId
```

#### Update Quiz Score

```http
PATCH /api/quizzes/:id/score
Content-Type: application/json

{
  "score": 9
}
```

---

### Flashcard Routes (`/api/flashcards`)

#### Create Flashcards

```http
POST /api/flashcards
Content-Type: application/json

{
  "userId": "user_id",
  "topic": "Biology",
  "cards": [
    {
      "front": "What is photosynthesis?",
      "back": "Process by which plants convert light energy into chemical energy"
    }
  ]
}
```

#### Get User's Flashcards

```http
GET /api/flashcards/user/:userId
```

---

### Chat Routes (`/api/chats`)

#### Save Chat Messages

```http
POST /api/chats
Content-Type: application/json

{
  "userId": "user_id",
  "messages": [
    {
      "role": "user",
      "content": "What is quantum physics?"
    },
    {
      "role": "assistant",
      "content": "Quantum physics is..."
    }
  ]
}
```

#### Get Chat History

```http
GET /api/chats/user/:userId
```

---

### Learning Resource Routes (`/api/learning-resources`)

#### Save Learning Resources

```http
POST /api/learning-resources
Content-Type: application/json

{
  "userId": "user_id",
  "topic": "Machine Learning",
  "resources": {
    "books": ["Book 1", "Book 2"],
    "videos": ["Video URL 1"],
    "websites": ["Website URL 1"],
    "courses": ["Course URL 1"]
  }
}
```

#### Get User's Resources

```http
GET /api/learning-resources/user/:userId
```

---

### Game Score Routes (`/api/game-scores`)

#### Save Game Score

```http
POST /api/game-scores
Content-Type: application/json

{
  "userId": "user_id",
  "gameType": "iq-test",
  "score": 120,
  "level": "Advanced"
}
```

**Game Types:**

- `iq-test`
- `aptitude-test`
- `gk-test`
- `2048`

#### Get User's Scores

```http
GET /api/game-scores/user/:userId
```

#### Get Leaderboard

```http
GET /api/game-scores/leaderboard/:gameType
```

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "userId": "user_id",
      "username": "John Doe",
      "score": 150,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Concept Animation Routes (`/api/concepts`)

#### Save Concept

```http
POST /api/concepts
Content-Type: application/json

{
  "userId": "user_id",
  "topic": "Photosynthesis",
  "summary": "Process overview...",
  "steps": ["Step 1", "Step 2"]
}
```

#### Get User's Concepts

```http
GET /api/concepts/user/:userId
```

---

### Course Routes (`/api/courses`)

#### Create Course

```http
POST /api/courses
Content-Type: application/json

{
  "userId": "user_id",
  "title": "Introduction to React",
  "description": "Learn React basics",
  "modules": [
    {
      "title": "Module 1",
      "content": "Content here..."
    }
  ]
}
```

#### Get User's Courses

```http
GET /api/courses?userId=user_id
```

#### Get Course by ID

```http
GET /api/courses/:id
```

#### Mark Course Complete

```http
PATCH /api/courses/:id/complete
```

#### Get Course Statistics

```http
GET /api/courses/stats/:userId
```

#### Delete Course

```http
DELETE /api/courses/:id
```

---

### Study Room Routes (`/api/study-rooms`)

#### Get All Active Rooms

```http
GET /api/study-rooms
```

#### Create Study Room

```http
POST /api/study-rooms
Content-Type: application/json

{
  "name": "Math Study Group",
  "createdBy": "user_id",
  "maxParticipants": 10
}
```

**Response:**

```json
{
  "success": true,
  "data": {
    "_id": "room_id",
    "name": "Math Study Group",
    "code": "ABC123",
    "createdBy": "user_id",
    "participants": [],
    "maxParticipants": 10,
    "isActive": true,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### Get Room Details

```http
GET /api/study-rooms/:id?userId=user_id
```

**Response:**

```json
{
  "success": true,
  "data": {
    "room": {
      /* room object */
    },
    "messages": [
      /* array of messages */
    ],
    "notes": [
      /* array of notes */
    ],
    "participants": [
      /* active participants */
    ]
  }
}
```

#### Join Study Room

```http
POST /api/study-rooms/join
Content-Type: application/json

{
  "code": "ABC123",
  "userId": "user_id",
  "username": "John Doe"
}
```

#### Leave Study Room

```http
POST /api/study-rooms/:id/leave
Content-Type: application/json

{
  "userId": "user_id"
}
```

#### Send Message (REST)

```http
POST /api/study-rooms/:id/messages
Content-Type: application/json

{
  "userId": "user_id",
  "username": "John Doe",
  "content": "Hello everyone!",
  "type": "user"
}
```

#### Add Note

```http
POST /api/study-rooms/:id/notes
Content-Type: application/json

{
  "userId": "user_id",
  "username": "John Doe",
  "content": "Important formula: E=mc²"
}
```

#### Update Note

```http
PATCH /api/study-rooms/:id/notes/:noteId
Content-Type: application/json

{
  "content": "Updated note content"
}
```

#### Delete Note

```http
DELETE /api/study-rooms/:id/notes/:noteId
```

#### Delete Study Room

```http
DELETE /api/study-rooms/:id
Content-Type: application/json

{
  "userId": "user_id"
}
```

---

### News Routes (`/api/news`)

#### Get Latest News

```http
GET /api/news
```

**Query Parameters:**

- `limit` (optional): Number of articles (default: 10)
- `category` (optional): News category

**Response:**

```json
{
  "success": true,
  "data": [
    {
      "title": "Article Title",
      "description": "Article description",
      "url": "https://...",
      "publishedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

---

### Payment Routes (`/api/payments`)

#### Create Razorpay Order

```http
POST /api/payments/create-order
Content-Type: application/json

{
  "amount": 300,
  "currency": "INR",
  "studentName": "John Doe",
  "topic": "Mathematics Doubt",
  "note": "Optional additional note"
}
```

**Response:**

```json
{
  "success": true,
  "order": {
    "id": "order_xxx",
    "amount": 30000,
    "currency": "INR",
    "receipt": "receipt_xxx"
  },
  "key_id": "rzp_test_xxx"
}
```

#### Verify Payment

```http
POST /api/payments/verify-payment
Content-Type: application/json

{
  "razorpay_order_id": "order_xxx",
  "razorpay_payment_id": "pay_xxx",
  "razorpay_signature": "signature_xxx",
  "studentName": "John Doe",
  "topic": "Mathematics Doubt",
  "note": "Optional note"
}
```

**Response:**

```json
{
  "success": true,
  "message": "Payment verified successfully",
  "data": {
    "orderId": "order_xxx",
    "paymentId": "pay_xxx",
    "meetLink": "https://meet.jit.si/LearnNest-xxx",
    "expiresAt": "2024-01-01T01:00:00.000Z",
    "studentName": "John Doe",
    "topic": "Mathematics Doubt"
  }
}
```

#### Get Payment Details

```http
GET /api/payments/payment/:paymentId
```

**Response:**

```json
{
  "success": true,
  "payment": {
    "id": "pay_xxx",
    "amount": 30000,
    "currency": "INR",
    "status": "captured",
    "method": "card"
  }
}
```

---

### File Upload (`/api/upload`)

#### Upload File

```http
POST /api/upload
Content-Type: multipart/form-data

file: [file]
```

**Supported File Types:**

- Images: jpeg, jpg, png, gif
- Documents: pdf, doc, docx, txt
- Archives: zip, rar

**File Size Limit:** 10MB

**Response:**

```json
{
  "success": true,
  "file": {
    "url": "/uploads/1234567890-filename.jpg",
    "name": "filename.jpg",
    "type": "image/jpeg",
    "size": 123456
  }
}
```

---

### Health Check

#### Check API Status

```http
GET /api/health
```

**Response:**

```json
{
  "success": true,
  "message": "LearnNest API is running",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🗄️ Database Models

### User Model

```javascript
{
  studentName: String (required),
  studentMobile: String (required, unique),
  parentMobile: String (required),
  password: String (required), // Note: Should be hashed in production
  role: String (enum: ['student', 'parent', 'teacher'], default: 'student'),
  createdAt: Date (default: now)
}
```

### Book Model

```javascript
{
  userId: String (required),
  topic: String (required),
  pages: [{
    pageNumber: Number,
    leftContent: String,
    rightContent: String
  }],
  createdAt: Date (default: now)
}
```

### Quiz Model

```javascript
{
  userId: String (required),
  topic: String (required),
  questions: [{
    question: String,
    options: [String],
    correctAnswer: Number,
    userAnswer: Number
  }],
  score: Number,
  totalQuestions: Number,
  createdAt: Date (default: now)
}
```

### Flashcard Model

```javascript
{
  userId: String (required),
  topic: String (required),
  cards: [{
    front: String,
    back: String
  }],
  createdAt: Date (default: now)
}
```

### Chat Model

```javascript
{
  userId: String (required),
  messages: [{
    role: String (enum: ['user', 'assistant']),
    content: String,
    timestamp: Date
  }],
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### LearningResource Model

```javascript
{
  userId: String (required),
  topic: String (required),
  resources: {
    books: [String],
    videos: [String],
    websites: [String],
    courses: [String]
  },
  createdAt: Date (default: now)
}
```

### GameScore Model

```javascript
{
  userId: String (required),
  gameType: String (required, enum: ['iq-test', 'aptitude-test', 'gk-test', '2048']),
  score: Number (required),
  level: String,
  createdAt: Date (default: now)
}
```

### ConceptAnimation Model

```javascript
{
  userId: String (required),
  topic: String (required),
  summary: String,
  steps: [String],
  createdAt: Date (default: now)
}
```

### Course Model

```javascript
{
  userId: String (required),
  title: String (required),
  description: String,
  modules: [{
    title: String,
    content: String,
    completed: Boolean (default: false)
  }],
  completed: Boolean (default: false),
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
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
    studyTime: Number (minutes, default: 0),
    isActive: Boolean (default: true)
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
  createdAt: Date (default: now),
  updatedAt: Date (default: now)
}
```

### Message Model

```javascript
{
  roomId: String (required),
  userId: String (required),
  username: String (required),
  content: String (required),
  type: String (enum: ['user', 'system', 'file'], default: 'user'),
  fileUrl: String,
  fileName: String,
  fileType: String,
  fileSize: Number,
  timestamp: Date (default: now)
}
```

## 🔌 Socket.IO Events

### Client → Server Events

#### joinRoom

Join a study room.

```javascript
socket.emit("joinRoom", {
  roomId: "room_id",
  userId: "user_id",
  username: "John Doe",
});
```

#### leaveRoom

Leave a study room.

```javascript
socket.emit("leaveRoom", {
  roomId: "room_id",
  userId: "user_id",
});
```

#### sendMessage

Send a message to the room.

```javascript
socket.emit("sendMessage", {
  roomId: "room_id",
  userId: "user_id",
  username: "John Doe",
  content: "Hello!",
  fileData: {
    // optional
    url: "/uploads/file.jpg",
    name: "file.jpg",
    type: "image/jpeg",
    size: 123456,
  },
});
```

#### addNote

Add a note to the shared board.

```javascript
socket.emit("addNote", {
  roomId: "room_id",
  note: {
    content: "Important note",
    createdBy: "user_id",
    username: "John Doe",
  },
});
```

#### updateNote

Update an existing note.

```javascript
socket.emit("updateNote", {
  roomId: "room_id",
  note: {
    _id: "note_id",
    content: "Updated content",
  },
});
```

#### deleteNote

Delete a note.

```javascript
socket.emit("deleteNote", {
  roomId: "room_id",
  noteId: "note_id",
});
```

#### updateStudyTime

Update user's study time in the room.

```javascript
socket.emit("updateStudyTime", {
  roomId: "room_id",
  userId: "user_id",
  studyTime: 60, // minutes
});
```

### Server → Client Events

#### userJoined

Emitted when a user joins the room.

```javascript
socket.on("userJoined", (data) => {
  const { participant, systemMessage } = data;
  // participant: { userId, username, joinedAt, studyTime, isActive }
  // systemMessage: Message object
});
```

#### userLeft

Emitted when a user leaves the room.

```javascript
socket.on("userLeft", (data) => {
  const { userId, systemMessage } = data;
});
```

#### newMessage

Emitted when a new message is sent.

```javascript
socket.on("newMessage", (message) => {
  // message: Message object
});
```

#### noteAdded

Emitted when a note is added.

```javascript
socket.on("noteAdded", (note) => {
  // note: Note object
});
```

#### noteUpdated

Emitted when a note is updated.

```javascript
socket.on("noteUpdated", (note) => {
  // note: Updated note object
});
```

#### noteDeleted

Emitted when a note is deleted.

```javascript
socket.on("noteDeleted", (noteId) => {
  // noteId: String
});
```

#### studyTimeUpdated

Emitted when study time is updated.

```javascript
socket.on("studyTimeUpdated", (data) => {
  const { userId, studyTime } = data;
});
```

## 📁 File Uploads

### Configuration

Files are stored in the `uploads/` directory with unique filenames:

```
uploads/1234567890-filename.jpg
```

### Supported Types

- **Images**: jpeg, jpg, png, gif
- **Documents**: pdf, doc, docx, txt
- **Archives**: zip, rar

### File Size Limit

Maximum file size: **10MB**

### Accessing Uploaded Files

Files are served statically at:

```
http://localhost:5000/uploads/filename.jpg
```

## 🤖 AI Integration

### Google Gemini AI

The backend uses Google Gemini AI for:

- Content generation (books, quizzes, flashcards, courses)
- Question answering in Question Bot
- Concept animation summaries
- Learning resource recommendations

### AI in Study Rooms

When a message contains `@ai`, the system:

1. Extracts the question (removes @ai)
2. Gets recent conversation context (last 5 messages)
3. Processes attached files (images, PDFs) if present
4. Generates AI response using Gemini 2.5 Flash
5. Saves and broadcasts the response as a message

**Example:**

```
User: "@ai What is photosynthesis?"
AI Assistant: "Photosynthesis is the process..."
```

## ⚠️ Error Handling

### Standard Error Response

```json
{
  "success": false,
  "error": "Error message here"
}
```

### HTTP Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

### Error Middleware

All errors are caught by error handling middleware and return standardized responses.

## 🚀 Deployment

### Render Deployment

1. Create a new Web Service on Render
2. Connect GitHub repository
3. Configure:
   - **Root Directory**: `Backend`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment**: Node
4. Add environment variables
5. Deploy

### Environment Variables for Production

```env
NODE_ENV=production
PORT=5000
MONGODB_URI=your_production_mongodb_uri
GEMINI_API_KEY=your_production_key
GNEWS_API_KEY=your_production_key
FRONTEND_URL=https://your-frontend-url.netlify.app
```

### Health Check Endpoint

Monitor server health:

```http
GET /api/health
```

## 📝 Notes

### Security Considerations

⚠️ **Important**: The current implementation stores passwords in plain text. For production:

- Use bcrypt or similar to hash passwords
- Implement JWT tokens for authentication
- Add rate limiting
- Validate and sanitize all inputs
- Use HTTPS in production

### Performance Optimization

- Use MongoDB indexes for frequently queried fields
- Implement caching for frequently accessed data
- Optimize file upload handling
- Consider CDN for static file serving

---

**For frontend documentation, see [../frontend/README.md](../frontend/README.md)**
