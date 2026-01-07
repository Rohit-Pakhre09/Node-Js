# Node.js Authentication Boilerplate

![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

A robust and secure authentication boilerplate for Node.js applications. This project provides a solid foundation for building applications that require user authentication and authorization. It includes features like JWT-based authentication, password hashing, and a clean project structure.

## 🚀 Features

-   **JWT Authentication:** Secure your APIs with JSON Web Tokens.
-   **Password Hashing:** Using `bcrypt` to securely store user passwords.
-   **OTP Verification:** Email-based OTP verification for new user registration.
-   **Middleware:** Includes middleware for handling errors and verifying JWTs.
-   **Modular Structure:** Organized and easy-to-understand project structure.
-   **Express Server:** Built with the fast and minimalist web framework for Node.js.

## 📦 Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repository.git
    cd your-repository
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root directory and add the following variables:
    ```env
    PORT=3000
    MONGODB_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    EMAIL_USER=your_email
    EMAIL_PASS=your_email_password
    ```

## 🏃 Usage

To run the development server, use the following command:

```bash
npm run dev
```

The server will start on the port specified in your `.env` file (default is 3000).

##  API Documentation

The following are the available API endpoints:

### `/home`

-   **Method:** `GET`
-   **Description:** A protected route that requires a valid JWT to access.
-   **Authentication:** `Required`
-   **Response:**
    -   `200 OK`:
        ```json
        {
            "message": "Welcome to the home page!"
        }
        ```

### `/signup`

-   **Method:** `POST`
-   **Description:** Registers a new user and sends an OTP to their email for verification.
-   **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }
    ```
-   **Response:**
    -   `201 Created`:
        ```json
        {
            "message": "OTP sent to your email. Please verify."
        }
        ```

### `/login`

-   **Method:** `POST`
-   **Description:** Authenticates a user and returns a JWT.
-   **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "password": "yourpassword"
    }
    ```
-   **Response:**
    -   `200 OK`:
        ```json
        {
            "message": "Login successful.",
            "token": "your_jwt_token"
        }
        ```

### `/verify-otp`

-   **Method:** `POST`
-   **Description:** Verifies the OTP sent to the user's email.
-   **Request Body:**
    ```json
    {
        "email": "user@example.com",
        "otp": "123456"
    }
    ```
-   **Response:**
    -   `200 OK`:
        ```json
        {
            "message": "OTP verified successfully. You can now log in."
        }
        ```

### `/logout`

-   **Method:** `POST`
-   **Description:** Logs out the user by clearing the authentication cookie.
-   **Authentication:** `Required`
-   **Response:**
    -   `200 OK`:
        ```json
        {
            "message": "Logout successful."
        }
        ```

## 📁 Project Structure

The project follows a modular structure to keep the code organized and maintainable.

```
.
├── src
│   ├── config
│   │   └── db.js           # Database connection
│   ├── controllers
│   │   └── user.controller.js # Request handlers
│   ├── middleware
│   │   ├── errorHandler.js # Error handling middleware
│   │   └── verifyJWT.js    # JWT verification middleware
│   ├── models
│   │   └── user.model.js   # Mongoose user schema
│   ├── routes
│   │   └── routes.js       # API routes
│   ├── services
│   │   └── sendMail.js     # Email service
│   └── utils
│       ├── ApiError.js     # Custom error class
│       ├── ApiResponse.js  # Custom response class
│       ├── asyncHandler.js # Async route handler
│       └── token.js        # Token generation
├── .env                    # Environment variables
├── .gitignore
├── index.js                # App entry point
├── package.json
├── README.md
└── server.js               # Express server setup
```

## 🛠️ Tech Stack

-   [MongoDB](https://www.mongodb.com/): NoSQL database for storing user data.
-   [Express.js](https://expressjs.com/): Web framework for building the API.
-   [React](https://reactjs.org/): (Frontend) A JavaScript library for building user interfaces.
-   [Node.js](https://nodejs.org/): JavaScript runtime for the backend.
-   [bcrypt](https://www.npmjs.com/package/bcrypt): For hashing passwords.
-   [cookie-parser](https://www.npmjs.com/package/cookie-parser): For parsing cookies.
-   [cors](https://www.npmjs.com/package/cors): For enabling Cross-Origin Resource Sharing.
-   [dotenv](https://www.npmjs.com/package/dotenv): For loading environment variables.
-   [helmet](https://www.npmjs.com/package/helmet): For securing Express apps by setting various HTTP headers.
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): For generating and verifying JSON Web Tokens.
-   [mongoose](https://www.npmjs.com/package/mongoose): MongoDB object modeling for Node.js.
-   [nodemailer](https://www.npmjs.com/package/nodemailer): For sending emails.

## 🤝 Contributing

Contributions are welcome! If you have any ideas, suggestions, or bug reports, please open an issue or submit a pull request.

## 🙏 Acknowledgements

-   [Shields.io](https://shields.io/) for the awesome badges.
-   All the amazing open-source libraries used in this project.