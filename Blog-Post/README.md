# BlogSpace: Full-Stack Blogging Platform

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

BlogSpace is a modern, full-stack blogging application featuring a secure RESTful API backend and a responsive, dynamic React frontend. It provides a complete platform for users to create, manage, and share their stories.

# 📸 Sneak Peak
![Blog-Post](/frontend//src/assets/blog-space.png)

# 📹 App Showcase Video
![Blog-Post](/frontend//src/assets/Blog-Space.gif)

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Error Handling](#-error-handling)

## ✨ Features

### Backend
- **User Authentication**: Secure registration and login using JWT (Access & Refresh Tokens).
- **Session Management**: Automatic token refreshment and secure `httpOnly` cookie handling.
- **Blog Management**: Full CRUD operations for blog posts.
- **Media Uploads**: Seamless image upload integration with Cloudinary using Multer.
- **Security**: Protected routes, CORS configuration, and password hashing with bcrypt.

### Frontend
- **Dynamic UI**: A fully responsive and modern user interface built with React and Tailwind CSS.
- **Client-Side Routing**: Smooth navigation between pages using React Router.
- **State Management**: Global user authentication state managed with React Context.
- **User Dashboard**: A dedicated dashboard for users to view, edit, and delete their own blog posts.
- **Rich Forms**: User-friendly forms for creating and editing blogs, including file uploads and category selection.
- **Confirmation Modals**: Enhanced user experience with custom modals for critical actions like post deletion.

## ⚙️ Tech Stack

| Area | Technology |
| :--- | :--- |
| **Frontend** | React, Vite, React Router, Axios, Tailwind CSS, Lucide Icons |
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (with Mongoose ODM) |
| **Authentication** | JSON Web Tokens (JWT), bcrypt |
| **File Storage** | Cloudinary |
| **Middleware** | Multer, CORS, Cookie-Parser |

## 📂 Folder Structure

```
Blog-Post/
├── backend/                    # Backend application (Node.js/Express)
│   ├── src/
│   │   ├── controllers/        # Request handlers (User, Blog)
│   │   ├── middlewares/        # Auth, Upload, Error handling
│   │   ├── models/             # Mongoose schemas
│   │   ├── routes/             # API route definitions
│   │   └── utils/              # Helper functions (AsyncHandler, Tokens)
│   ├── index.js                # Backend entry point
│   ├── package.json            # Backend dependencies
│   └── .env                    # Backend environment variables
├── frontend/                   # Frontend application (React/Vite)
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── context/            # React Context for state management
│   │   ├── hooks/              # Custom React hooks
│   │   ├── api/                # API configuration and constants
│   │   └── assets/             # Static assets
│   ├── public/                 # Public assets
│   ├── index.html              # Main HTML file
│   ├── package.json            # Frontend dependencies
│   └── vite.config.js          # Vite configuration
└── README.md                   # Project documentation
```

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [MongoDB](https://www.mongodb.com/) (Local or Atlas)
- A [Cloudinary](https://cloudinary.com/) account

### Installation

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd Blog-Post
    ```

2.  **Backend Setup**
    ```bash
    cd backend
    npm install
    ```
    Create a `.env` file in the `backend/` directory with the required environment variables (see below).

3.  **Frontend Setup**
    ```bash
    cd ../frontend
    npm install
    ```

4.  **Run the Applications**
    - **Backend**: In the `backend/` directory, start the server:
      ```bash
      npm start
      ```
    - **Frontend**: In the `frontend/` directory, start the development server:
      ```bash
      npm run dev
      ```
      The frontend will typically run on `http://localhost:5173` (default Vite port), and the backend on `http://localhost:8000` (as configured).

## 🔐 Environment Variables

Create a `.env` file in the root of your project and add the following keys:

```env
PORT=8000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/blog-db
CORS_ORIGIN=http://localhost:3000
NODE_ENV=development

# JWT Configuration
ACCESS_TOKEN_SECRET=your_super_secret_access_key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_SECRET=your_super_secret_refresh_key
REFRESH_TOKEN_EXPIRY=5d

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## 📖 API Documentation

### Authentication Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Register a new user | ❌ |
| `POST` | `/login` | Login user & get tokens | ❌ |
| `POST` | `/logout` | Logout user & clear cookies | ✅ |
| `POST` | `/refresh-token` | Refresh access token | ❌ (Cookie) |
| `GET` | `/checkauth` | Check if user is logged in | ✅ |

### Blog Endpoints

| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/blogs` | Get all blogs | ❌ |
| `POST` | `/blogs` | Create a new blog | ✅ |
| `GET` | `/blogs/user` | Get logged-in user's blogs | ✅ |
| `PUT` | `/blogs/update/:blogId` | Update a blog post | ✅ (Owner) |
| `DELETE` | `/blogs/delete/:blogId` | Delete a blog post | ✅ (Owner) |

### Request Examples

#### **Create Blog (Multipart/Form-Data)**
**Endpoint:** `POST /blogs`
- **Headers:** `Authorization: Bearer <token>`
- **Body:**
  - `title`: "My First Blog"
  - `description`: "This is the content..."
  - `category`: "Technology"
  - `image`: (File Upload)

#### **Register User (JSON)**
**Endpoint:** `POST /register`
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
```

## ⚠️ Error Handling

The API uses standard HTTP status codes to indicate the success or failure of an API request.

- **200**: OK - Request succeeded.
- **201**: Created - Resource created successfully.
- **400**: Bad Request - Missing fields or invalid data.
- **401**: Unauthorized - Invalid or expired token.
- **403**: Forbidden - User does not have permission.
- **404**: Not Found - Resource not found.
- **500**: Internal Server Error - Server-side issue.

**Error Response Format:**
```json
{
  "message": "Error description here"
}
```