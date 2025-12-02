# Book Store API

![Node.js](https://img.shields.io/badge/Node.js-18.x-339933?style=plastic&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?style=plastic&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4.x-47A248?style=plastic&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-9.x-880000?style=plastic&logo=mongoose&logoColor=white)
![Morgan](https://img.shields.io/badge/Morgan-1.x-FF6B35?style=plastic&logo=morgan&logoColor=white)

A RESTful API for managing a book store, built with Node.js, Express.js, and MongoDB. This backend application provides full CRUD operations for books, including logging and environment-based configuration. It supports JSON request/response formats and uses middleware for request logging and JSON parsing.

## API Showcase
![API Video](./assets/Book%20Store%20API.gif)

## Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Logging**: Morgan
- **Environment Management**: dotenv

### Prerequisites

- Node.js (version 18.x or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

## Features

- Add new books to the store
- Retrieve all books or a specific book by ID
- Update book details
- Delete books from the store
- Request logging middleware for monitoring
- Environment variable support for configuration
- Modular architecture with separate controllers, models, and routes
- JSON-based request and response handling
- Database connectivity with MongoDB using Mongoose

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd book-store
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

The server will start on the specified port (default: 3000).

## Usage

Once the server is running, you can interact with the API using tools like Postman, curl, or any HTTP client. The API base URL is `http://localhost:<PORT>`.

## API Endpoints

| Method | Endpoint | Description         |
| ------ | -------- | ------------------- |
| POST   | `/`      | Add a new book      |
| GET    | `/`      | Get all books       |
| GET    | `/:id`   | Get a book by ID    |
| PATCH  | `/:id`   | Update a book by ID |
| DELETE | `/:id`   | Delete a book by ID |

### Example Request

**Add a Book (POST /)**:

```bash
{
  "bookId": "B101",
  "bookName": "Introduction to Computer Science",
  "author": "John Smith",
  "publishYear": 2020,
  "price": 499,
  "language": "English",
  "pages": 320,
  "category": "Technology",
  "isbn": "978-1-4028-9462-6"
}
```

**Response**:

```bash
{
  {
    "_id": "book-id",
    "bookId": "B101",
    "bookName": "Introduction to Computer Science",
    "author": "John Smith",
    "publishYear": 2020,
    "price": 499,
    "language": "English",
    "pages": 320,
    "category": "Technology",
    "isbn": "978-1-4028-9462-6"
  }
}
```

## Project Structure

```bash
book-store/
├── config/
│   └── db.js              # Database connection
├── controllers/           # Route handlers
│   ├── addBook.controller.js
│   ├── deleteBook.controller.js
│   ├── getAllBooks.controller.js
│   ├── getBookById.controller.js
│   └── updateBook.controller.js
├── logs/
│   └── access.log         # Access logs
├── middleware/
│   └── logger.js          # Logging middleware
├── models/
│   └── book.model.js      # Book schema
├── routes/
│   └── routes.js          # API routes
├── app.js                 # Express app setup
├── server.js              # Server entry point
├── package.json           # Dependencies and scripts
└── README.md              # Project documentation
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Scripts

- `npm run dev`: Start the development server with hot reloading using Node.js --watch

## Environment Variables

The application uses the following environment variables:

- `PORT`: Port number for the server (default: 3000)
- `MONGODB_URI`: MongoDB connection string

## Error Handling

The API includes comprehensive error handling for:

- Invalid request data
- Database connection issues
- Non-existent resources
- Server errors

## Logging

All incoming requests are logged using Morgan middleware, with logs stored in `logs/access.log`.

## Author

[Rohit Pakhre](https://github.com/Rohit-Pakhre09)
