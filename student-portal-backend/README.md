# 🚀 Student Portal Backend

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=flat&logo=mongodb&logoColor=white)
![Multer](https://img.shields.io/badge/Multer-File%20Upload-blue?style=flat)
![Dotenv](https://img.shields.io/badge/Dotenv-Environment%20Variables-green?style=flat)

A powerful, scalable RESTful API crafted with Node.js and Express to revolutionize student data management! 🎓✨ This backend powerhouse enables seamless CRUD operations on student records, complete with advanced file upload capabilities for profile images. Dive into a world where data flows effortlessly, security is paramount, and performance is king. Whether you're building a cutting-edge student portal or integrating robust backend services, this API is your ultimate companion for efficient, reliable data handling.

## 📖 Description

Welcome to the Student Portal Backend – your gateway to streamlined student management! 🌟 This sophisticated backend application delivers a comprehensive API solution designed for modern student portals. Experience the freedom of performing full Create, Read, Update, and Delete (CRUD) operations on student data, enhanced with intelligent profile image uploads powered by Multer middleware. Built with scalability in mind, it ensures lightning-fast responses, secure data handling, and intuitive integration. From enrollment to updates, manage student information with unparalleled ease and precision. Ready to elevate your educational platform? Let's get started! 🚀

## ✨ Features

- 🔄 **CRUD Operations**: Full Create, Read, Update, Delete functionality for student records
- 📤 **File Upload**: Support for uploading student profile images with ease
- 🗄️ **MongoDB Integration**: Seamless database operations using Mongoose ODM
- 🌐 **RESTful API**: Well-structured endpoints following REST principles
- 🔐 **Environment Configuration**: Secure handling of sensitive data using dotenv
- 📁 **Static File Serving**: Efficiently serves uploaded images via a dedicated route

## 🛠️ Tech Stack

- ⚡ **Runtime**: Node.js
- 🚀 **Framework**: Express.js
- 📊 **Database**: MongoDB with Mongoose ODM
- 📎 **File Upload**: Multer
- 🔧 **Environment**: dotenv

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd student-portal-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=<PORT NUMBER>
   MONGODB_URI=<MONGODB CLUSTER URI>
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on the specified PORT (default: 3000).

## Usage

The API provides the following endpoints:

### Base URL
```
http://localhost:PORT
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/` | Add a new student (with optional profile image) |
| GET | `/` | Get all students |
| GET | `/:id` | Get a specific student by ID |
| PUT | `/:id` | Update a student by ID (with optional profile image) |
| DELETE | `/:id` | Delete a student by ID |

### Request/Response Examples

#### Add Student
```bash
POST /
Content-Type: multipart/form-data

{
  "stdId": "STU001",
  "stdName": "John Doe",
  "email": "john@example.com",
  "phone": 1234567890,
  "profileImage": [file]
}
```

#### Get All Students
```bash
GET /
```

Response:
```bash
[
  {
    "_id": "student_id",
    "stdId": "STU001",
    "stdName": "John Doe",
    "email": "john@example.com",
    "phone": 1234567890,
    "profileImage": "uploads/filename.jpg",
    "createdAt": "2023-01-01T00:00:00.000Z",
    "updatedAt": "2023-01-01T00:00:00.000Z"
  }
]
```

## Project Structure

```bash
student-portal-backend/
├── config/
│   └── db.js                 # Database connection configuration
├── controllers/
│   └── students.controller.js # Student CRUD operations
├── middleware/
│   └── upload.js             # Multer configuration for file uploads
├── models/
│   └── student.model.js      # Student data model
├── router/
│   └── routes.js             # API route definitions
├── uploads/                  # Directory for uploaded files
├── .env                      # Environment variables (create this file)
├── .gitignore                # Git ignore rules
├── index.js                  # Express app setup
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
└── server.js                 # Server startup file
```

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

- `PORT`: The port number for the server (e.g., 3000)
- `MONGODB_URI`: MongoDB connection string (use production URI for deployment)

## 🔒 Security

- **Keep your `.env` file private** - never commit it to Git
- **Validate inputs** - the app uses Mongoose schemas for basic validation
- **Use HTTPS** in production for secure data transmission
- **Regularly update dependencies** to fix security vulnerabilities

## ⚡ Performance Tips

- **Database queries** - ensure your MongoDB queries are efficient
- **File uploads** - limit file sizes in the upload middleware
- **Error handling** - properly handle errors to prevent crashes

### Basic API Docs

- **Base URL**: `http://localhost:3000` (development) or your production URL
- **Content-Type**: `application/json` for most requests, `multipart/form-data` for file uploads
- **Authentication**: None required for this basic version

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License - see the [package.json](package.json) file for details.

## 👨‍💻 Author

[Rohit Pakhre](https://github.com/Rohit-Pakhre09)