# 🚀 Product Management API

A comprehensive and robust RESTful API designed for efficient product management, built with modern technologies to ensure scalability, performance, and ease of use. This API empowers developers to seamlessly create, retrieve, filter, and manage product data with advanced querying capabilities, making it ideal for e-commerce platforms, inventory systems, and product catalog applications.

## 📋 Table of Contents

- [✨ Features](#-features)
- [🛠️ Technologies Used](#️-technologies-used)
- [📦 Installation](#-installation)
- [🔧 Environment Variables](#-environment-variables)
- [🔗 API Endpoints](#-api-endpoints)
- [⚠️ Error Handling](#️-error-handling)
- [🤝 Contributing](#-contributing)
- [📄 Authors](#authors)

## ✨ Features

- **📝 Product CRUD Operations**: Complete Create, Read, Update, and Delete functionality for product management
- **🔍 Advanced Filtering & Searching**: Powerful search capabilities across multiple fields with case-insensitive matching
- **📄 Pagination Support**: Efficient data retrieval with customizable page sizes and navigation
- **📈 Sorting Capabilities**: Flexible sorting options including price-based ordering (ascending/descending)
- **⭐ Rating-Based Filtering**: Filter products by minimum rating thresholds for quality assurance
- **🛡️ Comprehensive Error Handling**: Robust error management with detailed JSON responses and appropriate HTTP status codes
- **🏗️ RESTful API Design**: Clean, intuitive, and standards-compliant API architecture
- **⚡ High Performance**: Optimized queries and efficient database operations for fast response times
- **🔒 Data Validation**: Built-in validation for all product fields ensuring data integrity

## 🛠️ Technologies Used

- **Node.js** 🚀 - Server-side JavaScript runtime environment
- **Express.js** ⚡ - Fast, unopinionated, minimalist web framework for Node.js
- **MongoDB** 🍃 - NoSQL document database for flexible data storage
- **Mongoose** 🧩 - Elegant MongoDB object modeling for Node.js applications

## 📦 Installation

Follow these step-by-step instructions to get the Product Management API up and running on your local machine:

### Prerequisites
- Node.js (version 16 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- npm or yarn package manager

### Step-by-Step Setup

1. **Clone the Repository** 📥
   ```bash
   git clone <repository-url>
   cd api-practical-task
   ```

2. **Install Dependencies** 📦
   ```bash
   npm install
   ```
   This command will install all necessary packages including Express.js, Mongoose, and other dependencies.

3. **Environment Configuration** ⚙️
   Create a `.env` file in the root directory and configure your environment variables (see [Environment Variables](#-environment-variables) section for details).

4. **Start the Development Server** ▶️
   ```bash
   npm run dev
   ```

5. **Verify Installation** ✅
   The server will start on the port specified in your `.env` file. You should see a message indicating successful connection to MongoDB and server startup.

## 🔧 Environment Variables

Configure your environment by creating a `.env` file in the root directory with the following essential variables:

```env
# Server Configuration
PORT=3000

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/product-management-api

```

**Security Note**: Never commit your `.env` file to version control. Add it to your `.gitignore` file.

## 🔗 API Endpoints

### Products Management

| Method | Endpoint | Description | Status |
|--------|----------|-------------|--------|
| POST | `/products` | 📝 Create a new product | ✅ Active |
| GET | `/products` | 📋 Retrieve all products | ✅ Active |
| GET | `/products/:id` | 🔍 Get specific product by ID | ✅ Active |
| GET | `/products/search/name?name=query` | 🔎 Search products by name (case-insensitive) | ✅ Active |
| GET | `/products/search/brand?brand=query` | 🏷️ Search products by brand | ✅ Active |
| GET | `/products/search/multiple?productName=query&category=query&brand=query` | 🔍 Advanced multi-field search | ✅ Active |
| GET | `/products/category?category=query` | 📂 Filter products by category | ✅ Active |
| GET | `/products/filter/price?min=100&max=500` | 💰 Filter products within price range | ✅ Active |
| GET | `/products/filter/rating?rating=4` | ⭐ Filter products by minimum rating | ✅ Active |
| GET | `/products/sort/price?order=asc` | 📈 Sort products by price (asc/desc) | ✅ Active |
| GET | `/products/pagination?page=1&limit=10` | 📄 Get paginated product results | ✅ Active |


## ⚠️ Error Handling

The API implements comprehensive error handling with standardized HTTP status codes and detailed JSON error responses to ensure smooth debugging and user experience.

### HTTP Status Codes
- `200` ✅ - Success (GET requests)
- `201` 🎉 - Created (successful POST requests)
- `400` ❌ - Bad Request (validation errors, missing required fields)
- `404` 🔍 - Not Found (product not found, no search results)
- `500` 💥 - Internal Server Error (database errors, server issues)


## 🤝 Contributing

We welcome contributions from the developer community! Here's how you can contribute to the Product Management API:

### Getting Started
1. **Fork the Repository** 🍴
   ```bash
   git clone https://github.com/your-username/product-management-api.git
   ```

2. **Create a Feature Branch** 🌿
   ```bash
   git checkout -b feature/amazing-new-feature
   ```

3. **Make Your Changes** 🔧
   - Follow the existing code style and conventions
   - Add tests for new features
   - Update documentation as needed

4. **Commit Your Changes** 💾
   ```bash
   git commit -m 'Add some amazing feature'
   ```

5. **Push to the Branch** 📤
   ```bash
   git push origin feature/amazing-new-feature
   ```

6. **Open a Pull Request** 🔄
   - Provide a clear description of your changes
   - Reference any related issues
   - Ensure all tests pass

### Development Guidelines
- Write clear, concise commit messages
- Follow the existing code structure and naming conventions
- Add appropriate error handling for new features
- Update the README.md for any new endpoints or features
- Test your changes thoroughly before submitting

## Authors

**👨‍💻 Author:** Rohit Pakhre  
**📧 Contact:** pakhrerohit@gmail.com  
**🔗 LinkedIn:** https://www.linkedin.com/in/rohit-pakhre 

---
