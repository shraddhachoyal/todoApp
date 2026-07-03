# Todo App

A simple Todo application built with **Node.js**, **Express.js**, **MongoDB**, **Mongoose**, and **EJS**. The application provides CRUD operations, search, sorting, pagination, toggle status functionality, and displays todos using server-side rendering.

## Features

* Add, update, delete, and view todos
* Toggle todo status (Completed/Pending)
* Search todos by title
* Sort todos by creation date
* Pagination
* EJS template engine for server-side rendering
* MongoDB integration using Mongoose

## Technologies Used

* Node.js
* Express.js
* MongoDB
* Mongoose
* EJS
* CORS
* Dotenv
* Nodemon

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/shraddhachoyal/todoApp.git
cd todoApp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Add the following variables:

```env
PORT=3001
MONGO_URI=your_mongodb_connection_string
```

### 4. Start the development server

```bash
npm run dev
```

The application will run at:

```
http://localhost:3001
```

## API Endpoints

| Method | Endpoint     | Description                                       |
| ------ | ------------ | ------------------------------------------------- |
| POST   | `/todos/add` | Create a new todo                                 |
| GET    | `/todos`     | Get all todos with search, sorting and pagination |
| GET    | `/todos/:id` | Get todo by ID                                    |
| PUT    | `/todos/:id` | Update a todo                                     |
| PATCH  | `/todos/:id` | Toggle todo status                                |
| DELETE | `/todos/:id` | Delete a todo                                     |

## Project Structure

```
todoApp/
│── config/
│── controllers/
│── middleware/
│── models/
│── routes/
│── views/
│── public/
│── server.js
│── package.json
│── .env
```

## Installation for a New Project

```bash
npm init -y
npm install express cors mongoose dotenv ejs
npm install --save-dev nodemon
```

Update your `package.json`:

```json
{
  "type": "module",
  "scripts": {
    "dev": "nodemon server.js"
  }
}
```

## Author

Developed by Shraddha Choyal.
