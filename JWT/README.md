# JWT Authentication Backend

A robust and secure template for a Node.js and Express backend implementing JWT (JSON Web Token) authentication with refresh tokens. This project provides a solid foundation for building secure APIs, with features like password hashing, rate limiting, and proper error handling.

## Features

-   **JWT Authentication:** Secure stateless authentication using access and refresh tokens.
-   **Refresh Token Rotation:** Automatically handles refreshing expired access tokens.
-   **HTTPOnly Cookies:** Refresh tokens are stored securely in HTTPOnly cookies to prevent XSS attacks.
-   **Password Hashing:** Uses `bcrypt` to securely hash and salt user passwords.
-   **Input Validation:** `zod` is used for validating request bodies to ensure data integrity.
-   **Rate Limiting:** Protects against brute-force attacks on authentication routes using `express-rate-limit`.
-   **CORS and Security Headers:** Pre-configured with `cors` and `helmet` for enhanced security.
-   **Structured API Responses:** Uses a consistent response format for successes and errors.
-   **ES Modules:** Written using modern ES Module syntax.

## Tech Stack

-   **Runtime:** [Node.js](https://nodejs.org/)
-   **Framework:** [Express.js](https://expressjs.com/)
-   **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Authentication:** [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken), [bcrypt](https://github.com/kelektiv/node.bcrypt.js)
-   **Validation:** [Zod](https://zod.dev/)
-   **Testing:** [Jest](https://jestjs.io/) & [Supertest](https://github.com/visionmedia/supertest)

## Getting Started

### Prerequisites

-   Node.js (v18.x or higher)
-   npm
-   MongoDB instance (local or cloud-based like MongoDB Atlas)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repository-url>
    cd <repository-name>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    Create a `.env` file in the root of the project and add the variables listed below.
    ```bash
    touch .env
    ```

## Environment Variables

Copy the following into your `.env` file and provide the required values.

```env
# Server Configuration
PORT=8000
CORS_ORIGIN=* # Or your frontend URL for production, e.g., http://localhost:3000

# MongoDB Connection
MONGODB_URI=<your-mongodb-connection-string>

# JWT Configuration
ACCESS_TOKEN_SECRET=<your-strong-access-token-secret>
ACCESS_TOKEN_EXPIRY=15m

REFRESH_TOKEN_SECRET=<your-strong-refresh-token-secret>
REFRESH_TOKEN_EXPIRY=7d
```

> **Note:** Use strong, long, and random strings for your JWT secrets.

## Available Scripts

-   **Run in development mode:**
    The server will watch for file changes and restart automatically.
    ```bash
    npm run dev
    ```

-   **Run tests:**
    ```bash
    npm test
    ```

---

## API Documentation

### Authentication

<details>
<summary>
  <code><span style="color: green; font-weight: bold; padding: 2px 6px; border-radius: 4px;">GET</span></code>
  <strong>/</strong>
  <small>- API Health Check</small>
</summary>

<br>

A simple health-check endpoint to see if the API is running and reachable.

#### Responses

<details>
<summary>✅ <strong>200 OK</strong></summary>

```json
{
  "statusCode": 200,
  "data": "Welcome to the API",
  "message": "Working",
  "success": true
}
```

</details>
</details>

<details>
<summary>
  <code><span style="color: orange; font-weight: bold; padding: 2px 6px; border-radius: 4px;">POST</span></code>
  <strong>/signup</strong>
  <small>- Register a new user</small>
</summary>

<br>

Registers a new user with the provided email and password. The email must be unique.

#### Request Body

| Field      | Type     | Description                    | Required |
| :--------- | :------- | :----------------------------- | :------- |
| `email`    | `string` | The user's email address.      | Yes      |
| `password` | `string` | The user's password (min 8 characters). | Yes      |

**Example:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Responses

<details>
<summary>✅ <strong>201 Created</strong></summary>

Returns the new user's information.

```json
{
  "statusCode": 201,
  "data": {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "user@example.com",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z"
  },
  "message": "User registered successfully",
  "success": true
}
```
</details>
<details>
<summary>❌ <strong>409 Conflict</strong></summary>

Returned if a user with the same email already exists.

```json
{
  "statusCode": 409,
  "message": "User with this email already exists",
  "success": false
}
```
</details>
</details>

<details>
<summary>
  <code><span style="color: orange; font-weight: bold; padding: 2px 6px; border-radius: 4px;">POST</span></code>
  <strong>/login</strong>
  <small>- Log in a user</small>
</summary>

<br>

Authenticates a user and returns an access token and a refresh token (in an HTTPOnly cookie).

#### Request Body

| Field      | Type     | Description               | Required |
| :--------- | :------- | :------------------------ | :------- |
| `email`    | `string` | The user's email address. | Yes      |
| `password` | `string` | The user's password.      | Yes      |

**Example:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Responses

<details>
<summary>✅ <strong>200 OK</strong></summary>

Returns the user's information and an access token. Sets the `refreshToken` in an HTTPOnly cookie.

```json
{
  "statusCode": 200,
  "data": {
    "user": {
      "_id": "60d0fe4f5311236168a109ca",
      "email": "user@example.com"
    },
    "accessToken": "ey...[short-lived-token]..."
  },
  "message": "Login successful",
  "success": true
}
```
</details>
<details>
<summary>❌ <strong>401 Unauthorized</strong></summary>

Returned if the password is incorrect.

```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "success": false
}
```
</details>
</details>

<details>
<summary>
  <code><span style="color: blue; font-weight: bold; padding: 2px 6px; border-radius: 4px;">GET</span></code>
  <strong>/profile</strong>
  <small>- Get user profile</small>
  <small style="color: #cc0000;">[Protected]</small>
</summary>

<br>

Retrieves the profile of the currently authenticated user.

#### Headers

| Name            | Description                               |
| :-------------- | :---------------------------------------- |
| `Authorization` | **Required.** `Bearer <accessToken>`      |


#### Responses

<details>
<summary>✅ <strong>200 OK</strong></summary>

```json
{
  "statusCode": 200,
  "data": {
    "_id": "60d0fe4f5311236168a109ca",
    "email": "user@example.com",
    "createdAt": "2023-01-01T12:00:00.000Z",
    "updatedAt": "2023-01-01T12:00:00.000Z"
  },
  "message": "Profile loaded successfully",
  "success": true
}
```
</details>
<details>
<summary>❌ <strong>401 Unauthorized</strong></summary>

Returned if the access token is missing or invalid.

```json
{
  "statusCode": 401,
  "message": "Unauthorized request",
  "success": false
}
```
</details>
</details>

<details>
<summary>
  <code><span style="color: orange; font-weight: bold; padding: 2px 6px; border-radius: 4px;">POST</span></code>
  <strong>/refresh-token</strong>
  <small>- Refresh access token</small>
</summary>

<br>

Issues a new access token using the `refreshToken` stored in the HTTPOnly cookie.

#### Responses

<details>
<summary>✅ <strong>200 OK</strong></summary>

Returns a new access token.

```json
{
  "statusCode": 200,
  "data": {
    "accessToken": "ey...[new-short-lived-token]..."
  },
  "message": "Token refreshed successfully",
  "success": true
}
```
</details>
<details>
<summary>❌ <strong>401 Unauthorized</strong></summary>

Returned if the refresh token is missing, invalid, or expired.

```json
{
  "statusCode": 401,
  "message": "Invalid refresh token",
  "success": false
}
```
</details>
</details>

<details>
<summary>
  <code><span style="color: orange; font-weight: bold; padding: 2px 6px; border-radius: 4px;">POST</span></code>
  <strong>/logout</strong>
  <small>- Log out user</small>
  <small style="color: #cc0000;">[Protected]</small>
</summary>

<br>

Logs the user out by clearing their refresh token from the database and the cookie.

#### Headers

| Name            | Description                               |
| :-------------- | :---------------------------------------- |
| `Authorization` | **Required.** `Bearer <accessToken>`      |

#### Responses

<details>
<summary>✅ <strong>200 OK</strong></summary>

Clears the `refreshToken` cookie.

```json
{
  "statusCode": 200,
  "data": {},
  "message": "Logout successful",
  "success": true
}
```
</details>
</details>

---

## License

This project is licensed under the **ISC License**. See the `LICENSE` file for more details.
