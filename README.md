# E-commerce backend setup

This project handles the backend for an application where users can manage products and orders.

## Features

- **Product Management**

  - Create a new product
  - View all products
  - Retrieve a specific product by ID
  - Update product information
  - Delete a product
  - Search for specific products

- **Order Management**
  - Create a new order
  - Retrieve all orders
  - Retrieve orders by user email

When an order is created, the product's inventory is updated by reducing the quantity and adjusting the `inStock` status.

## Installation

```bash
# Clone the repository
git clone https://github.com/RobinTheRedLight/e-commerce-backend.git

# Navigate to the project directory
cd e-commerce-backend

# Install the necessary dependencies
npm install

# Create a .env file in the root directory and define the following variables:
  PORT=5000
  MONGODB_URI=[MongoDB Connection URI]

# Build the project for production
npm run build

# Start the server for production
npm start

Before you begin, ensure you have met the following requirements:
- Node.js and npm installed on your machine.

```
