# Blog Post API

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

A robust and scalable RESTful API for a blogging platform. This backend service manages user authentication, blog posts, and media uploads, serving as a solid foundation for any frontend blog application.

## 📑 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Documentation](#-api-documentation)
- [Error Handling](#-error-handling)

## ✨ Features

- **User Authentication**: Secure registration and login using JWT (Access & Refresh Tokens).
- **Session Management**: Automatic token refreshment and secure cookie handling.
- **Blog Management**: CRUD operations for blog posts.
- **Media Uploads**: Image upload integration with Cloudinary using Multer.
- **Security**: Protected routes, CORS configuration, and password hashing.
- **Scalability**: Modular code structure with separate controllers, routes, and middlewares.

## � Tech Stack

- **Runtime Environment**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JSON Web Tokens (JWT)
- **File Storage**: Cloudinary
- **Middleware**: Multer (File handling), CORS, Cookie-Parser

## 📂 Folder Structure

```
Blog-Post/
├── src/
│   ├── controllers/    # Request handlers (User, Blog)
│   ├── middlewares/    # Auth, Upload, Error handling
│   ├── models/         # Mongoose schemas
│   ├── routes/         # API route definitions
│   └── utils/          # Helper functions (AsyncHandler, Tokens)
├── index.js            # Entry point
├── .env                # Environment variables
└── package.json        # Dependencies
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

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables**
    Create a `.env` file in the root directory (see below).

4.  **Run the Server**
    ```bash
    # Start the server
    npm start
    ```

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