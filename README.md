# E-Commerce Store Project

## Overview

Welcome to the E-Commerce Store Project! This project is a full-stack application built with React for the frontend and Node.js/Express for the backend. The project aims to deliver a seamless e-commerce experience, featuring product management, user authentication, and a shopping cart.

## Project Structure

- **`src/`**: The source code of the backend application.
  - **`config/`
    - `config.env`
  - **`constant/`
    - `errorMessages.js`
    - `httpStatusCodes.js`
    - `roles.js`
  - **`controller/`
    - `cartController.js`
    - `itemController.js`
    - `orderController.js`
    - `userController.js`
  - **`middleware/`
  - **`models/`
    - `cartModel.js`
    - `itemModel.js`
    - `orderModel.js`
    - `orderDetailsModel.js`
  - **`routes/`
    - `cartRoutes.js`
    - `itemRoutes.js`
    - `userRoutes.js`
    - `orderRoutes.js`
  - **`utils/`**: Utility functions and helpers used across the application.
    - `errorHandler.js`


## Features

### Backend

- **Middleware**:
  - **`authMiddleware`**: Protects routes that require authentication and verifies JWT tokens.
  - **`errorHandler`**: Catches and handles errors, sending appropriate responses to the client.

- **Models**:
  - **`User`**: Defines the schema for user data, including authentication details.
  - **`Product`**: Defines the schema for product data, including product details and pricing.
  - **`Order`**: Defines the schema for order data, including order history and details.

- **Routes**:
  - **`cartRoutes`**: Provides endpoints for adding and checkout products.
  - **`itemRoutes`**: Provides endpoints for CRUD operations on items.
  - **`orderRoutes`**: Provides endpoints for processing orders and managing order history.
  - **`userRoutes`**: Provides endpoints for login/registrationy.

