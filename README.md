<h2 align="center"> TaskMaster Backend API </h2>

## Overview

This is a RESTful API for managing users, projects, and tasks. It includes authentication using JSON Web Tokens (JWT) and ensures secure access through proper authorization checks. The API allows users to register, log in, and manage their own projects and tasks.

---

## Tech Stack

* Node.js
* Express.js
* MongoDB with Mongoose
* bcrypt (password hashing)
* JSON Web Token (JWT)
* dotenv (environment variables)

---

## Project Structure

```
project-root/
│
├── config/
│   └── db.js              # MongoDB connection
│
├── models/
│   ├── User.js
│   ├── Project.js
│   └── Task.js
│
├── routes/
│     ├── userRoutes.js
│     ├── projectRoutes.js
│     └── taskRoutes.js
│
├── utils/
│   └── auth.js  # JWT authentication
│
├── .env
├── .gitignore
├── package.json
└── server.js
```

---

## Environment Variables

Create a `.env` file in the root:

```
MONGO_URI=your_mongodb_connection_string
PORT=3000
JWT_SECRET=your_secure_secret
```

---

## API Endpoints

### Authentication Routes

#### Register User

**POST /api/users/register**

* Creates a new user
* Password is hashed automatically

**Body:**

```
{
  "username": "John",
  "email": "john@example.com",
  "password": "123456"
}
```

---

#### Login User

**POST /api/users/login**

* Authenticates user
* Returns JWT token

**Body:**

```
{
  "email": "john@example.com",
  "password": "123456"
}
```

---

## Project Routes (Protected)

> All routes require Authorization header:

```
Authorization: Bearer <token>
```

#### Create Project

**POST /api/projects**

#### Get All Projects

**GET /api/projects**

* Returns projects owned by logged-in user

#### Get Single Project

**GET /api/projects/:id**

* Only accessible if user owns the project

#### Update Project

**PUT /api/projects/:id**

* Ownership required

#### Delete Project

**DELETE /api/projects/:id**

* Ownership required

---

## Task Routes (Protected & Nested)

#### Create Task

**POST /api/projects/:projectId/tasks**

* Creates task under a project
* Verifies project ownership

#### Get Tasks for Project

**GET /api/projects/:projectId/tasks**

* Returns all tasks for a project
* Requires ownership check

#### Update Task

**PUT /api/tasks/:taskId**

* Steps:

  1. Find task
  2. Get its project
  3. Verify project ownership

#### Delete Task

**DELETE /api/tasks/:taskId**

* Same authorization logic as update

---

## Data Models

### User

* username (String)
* email (String, unique)
* password (hashed)

---

### Project

* name (String)
* description (String)
* user (ObjectId, ref: User)

---

### Task

* title (String)
* description (String)
* status (To Do / In Progress / Done)
* project (ObjectId, ref: Project)

---

## Security Features

* Password hashing using bcrypt
* JWT-based authentication
* Route protection via middleware
* Ownership checks for all sensitive operations

---

## Setup Instructions

1. Clone the repository

```
git clone https://github.com/jayanthibs/taskmaster-backend-api-project.git

cd taskmaster-backend-api-project
```

2. Run:

```
npm install
```

3. Configure `.env`
4. Start server:

```
npm run dev
```

