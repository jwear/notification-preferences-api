# Notification Preferences API

A lightweight REST API for managing application notification preferences.

This project is built with Node.js and Express and focuses on common backend API patterns including routing, request handling, validation, error handling, and CRUD operations.

## Tech Stack

- Node.js
- Express
- JavaScript

## Endpoints

| Method | Endpoint           | Description                         |
| ------ | ------------------ | ----------------------------------- |
| POST   | `/preferences`     | Create a notification preference    |
| GET    | `/preferences`     | Get all notification preferences    |
| GET    | `/preferences/:id` | Get a notification preference by ID |
| PATCH  | `/preferences/:id` | Update a notification preference    |
| DELETE | `/preferences/:id` | Delete a notification preference    |

## Getting Started

Install dependencies:

```bash
npm install
```

## Run in development

Start the server with nodemon:

```bash
npm run dev
```

Nodemon automatically restarts the server when source files change.

## Run normally

Start the server with Node.js:

```bash
npm start
```

The API runs locally at:

```bash
http://localhost:3000
```
