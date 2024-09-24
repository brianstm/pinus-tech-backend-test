# Expense Tracker API

This is a simple Expense Tracker API built using **Express.js**, **MongoDB**, and **TypeScript**. The API allows users to perform CRUD operations (Create, Read, Update, Delete) on expense data, including fields such as `title`, `amount`, `date`, and `category`.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Getting Started](#getting-started)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Create Expense](#create-expense)
  - [Get All Expenses](#get-all-expenses)
  - [Get Expense by ID](#get-expense-by-id)
  - [Update Expense](#update-expense)
  - [Delete Expense](#delete-expense)
- [Database Schema](#database-schema)
- [License](#license)

## Features

- Add new expenses (title, amount, date, category).
- Fetch all expenses in the system, sorted by date (most recent first).
- Fetch a single expense by its ID.
- Update an existing expense's details.
- Delete an expense by ID.
- Data validation for required fields (`title`, `amount`, `date`, `category`).

## Technologies

- [Node.js](https://nodejs.org/) - Backend runtime environment
- [Express.js](https://expressjs.com/) - Web framework for Node.js
- [MongoDB](https://www.mongodb.com/) - NoSQL database
- [Mongoose](https://mongoosejs.com/) - MongoDB object modeling for Node.js
- [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript superset

## Getting Started

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/expense-tracker-api.git
   cd expense-tracker-api
   ```

2. Install the required dependencies:

   ```bash
   npm install
   ```

### Environment Variables

To run this project, you will need to create a `.env` file in the root directory with the following variables:

```env
PORT=8000
MONGODB_URI=mongodb+srv://...
```

### Running the Application

1. Start the MongoDB server on your local machine or use a remote MongoDB server.
2. Run the development server:

   ```bash
   npm run dev
   ```

3. The API will be running at `http://localhost:8000`.

## API Endpoints

### Create Expense

- **Endpoint:** `POST /api/expenses`
- **Description:** Create a new expense record.
- **Request Body:**

  ```json
  {
    "title": "Groceries",
    "amount": 50,
    "date": "2023-09-23",
    "category": "Food"
  }
  ```

- **Response:** Returns the created expense.

### Get All Expenses

- **Endpoint:** `GET /api/expenses`
- **Description:** Retrieve all expense records sorted by date (most recent first).
- **Response:**

  ```json
  [
    {
      "_id": "64123456789abcdef",
      "title": "Groceries",
      "amount": 50,
      "date": "2023-09-23",
      "category": "Food",
      "createdAt": "2023-09-23T12:34:56.789Z",
      "updatedAt": "2023-09-23T12:34:56.789Z"
    },
    ...
  ]
  ```

### Get Expense by ID

- **Endpoint:** `GET /api/expenses/:id`
- **Description:** Retrieve a specific expense by its ID.
- **Response:**

  ```json
  {
    "_id": "64123456789abcdef",
    "title": "Groceries",
    "amount": 50,
    "date": "2023-09-23",
    "category": "Food",
    "createdAt": "2023-09-23T12:34:56.789Z",
    "updatedAt": "2023-09-23T12:34:56.789Z"
  }
  ```

### Update Expense

- **Endpoint:** `PUT /api/expenses/:id`
- **Description:** Update an existing expense.
- **Request Body:**

  ```json
  {
    "title": "Groceries and Drinks",
    "amount": 75
  }
  ```

- **Response:** Returns the updated expense.

### Delete Expense

- **Endpoint:** `DELETE /api/expenses/:id`
- **Description:** Delete an expense by its ID.
- **Response:**

  ```json
  {
    "message": "Expense deleted successfully"
  }
  ```

## Database Schema

The expense data is stored in MongoDB with the following schema:

```json
{
  "title": "String", // Expense title (e.g., Groceries)
  "amount": "Number", // Expense amount (e.g., 50)
  "date": "Date", // Date of the expense
  "category": "String", // Category of the expense (e.g., Food)
  "createdAt": "Date", // Timestamp for when the record was created
  "updatedAt": "Date" // Timestamp for when the record was last updated
}
```
