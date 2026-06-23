# Employee Management System

A full-stack Employee Management System built using the MERN Stack. The application allows users to securely manage employee records with authentication, search, filtering, sorting, pagination, and a modern responsive UI.

---

# Project Overview

This application provides a complete employee management solution where authenticated users can:

* Register and Login
* Add Employees
* Update Employees
* Delete Employees
* Search Employees by Name
* Filter Employees by Department
* Sort Employees by Joining Date
* View Employee List with Pagination
* Access Protected Routes using JWT Authentication

---

# Features

## Authentication Module

* User Registration
* User Login
* JWT Authentication
* Protected Routes
* Secure Password Hashing using bcryptjs

## Employee Management Module

* Add Employee
* Edit Employee
* Delete Employee
* View Employee List
* Search Employee by Name
* Department Filtering
* Sort by Joining Date
* Pagination

## UI Features

* Responsive Design
* Tailwind CSS Styling
* Framer Motion Animations
* Toast Notifications
* Loading Spinner
* Delete Confirmation Modal
* Empty State Screen
* Mobile Responsive Dashboard

---

# Tech Stack

## Frontend

* React.js (Vite)
* React Router DOM
* Axios
* Tailwind CSS
* Framer Motion
* React Toastify
* React Icons
* Headless UI

## Backend

* Node.js
* Express.js
* JWT Authentication
* bcryptjs
* Joi Validation

## Database

* MongoDB Atlas
* Mongoose ODM

---

# Project Structure

```bash
Employee-Management-System
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── pages
│   │   ├── services
│   │   ├── routes
│   │   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── validators
│   └── server.js
│
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/employee-management-system.git

cd employee-management-system
```

---

# Backend Setup

Navigate to backend folder:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

Run backend server:

```bash
npm run dev
```

---

# Frontend Setup

Navigate to frontend folder:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create `.env` file:

```env
VITE_API_URL=http://localhost:5000/api
```

Run frontend:

```bash
npm run dev
```

---

# API Documentation

## Authentication

### Register User

```http
POST /api/auth/register
```

Request:

```json
{
  "name": "John Doe",
  "email": "john@gmail.com",
  "password": "123456"
}
```

---

### Login User

```http
POST /api/auth/login
```

Request:

```json
{
  "email": "john@gmail.com",
  "password": "123456"
}
```

Response:

```json
{
  "token": "jwt_token"
}
```

---

## Employee APIs

### Get All Employees

```http
GET /api/employees
```

Query Parameters:

```bash
?search=
?department=
?page=1
?order=desc
```

---

### Get Employee By ID

```http
GET /api/employees/:id
```

---

### Add Employee

```http
POST /api/employees
```

Request:

```json
{
  "fullName": "John Doe",
  "email": "john@gmail.com",
  "mobileNumber": "9876543210",
  "department": "IT",
  "designation": "Frontend Developer",
  "joiningDate": "2026-06-23"
}
```

---

### Update Employee

```http
PUT /api/employees/:id
```

---

### Delete Employee

```http
DELETE /api/employees/:id
```

---

# Validation Rules

Employee fields validation using Joi:

```javascript
fullName: minimum 3 characters

email: valid email format

mobileNumber: exactly 10 digits

department: required

designation: required

joiningDate: required
```

---

# Authentication Flow

1. User registers
2. User logs in
3. JWT Token is generated
4. Token stored in Local Storage
5. Axios interceptor adds token to every request
6. Protected routes verify JWT token

---

# Deployment

## Frontend

Deploy on Vercel

Example:

```text
https://employee-management.vercel.app
```

## Backend

Deploy on Render

Example:

```text
https://employee-management-api.onrender.com
```

## Database

MongoDB Atlas

---

# Environment Variables

## Backend

```env
PORT=5000

MONGO_URI=

JWT_SECRET=
```


# Screenshots

Add screenshots here:

### Login Page

![Login Screenshot](./screenshots/login.png)

### Register Page

![Register Screenshot](./screenshots/register.png)

### Dashboard

![Dashboard Screenshot](./screenshots/dashboard.png)

### Add Employee Modal

![Add Employee Screenshot](./screenshots/add-employee.png)

### Edit Employee Modal

![Edit Employee Screenshot](./screenshots/edit-employee.png)

---

# Future Enhancements

* Redux Toolkit
* Dark Mode
* Export to Excel
* Export to PDF
* Employee Profile Images
* Role Based Access Control
* Unit Testing


---

# Author

**Sakshi Arun Havaldar**

MCA Student
Java | MERN Stack | Full Stack Developer


# License

This project is developed for educational and internship assessment purposes.
