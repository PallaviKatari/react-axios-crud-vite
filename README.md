# React Axios CRUD App

This project is a simple React + TypeScript CRUD application that uses Axios to communicate with a local JSON Server API. It allows users to create, read, update, and delete user records from a table-based form interface.

The app is built with:

- React 19
- TypeScript
- Vite
- Axios
- Fluent UI React Components
- JSON Server

## Project Overview

The app displays a list of users in a table and provides a form for adding or updating records. Each user includes:

- id
- name
- email
- username

The app sends HTTP requests to the API running at `http://localhost:3001` and stores the data in `db.json`.

## Features

- View all users in a table
- Add a new user
- Edit an existing user
- Delete a user
- Validate required fields before submitting
- Use the latest React UI patterns with Fluent UI
- Persist data locally using JSON Server

## Tech Stack

- Frontend: React + TypeScript + Vite
- Styling/UI: Fluent UI
- HTTP client: Axios
- Local API/mock backend: JSON Server
- Data storage: `db.json`

## Prerequisites

Before running the app, make sure you have the following installed:

- Node.js (v18 or higher is recommended)
- npm (usually comes with Node.js)
- A modern browser such as Chrome, Edge, or Firefox

## Project Structure

```bash
react-axios-crud/
├── db.json                 # JSON Server database used for mock API data
├── index.html             # HTML entry point
├── package.json           # Scripts and dependencies
├── vite.config.ts         # Vite configuration
├── tsconfig.json          # TypeScript config
├── tsconfig.app.json      # App TS config
├── tsconfig.node.json     # Node TS config
├── eslint.config.js       # ESLint config
├── public/                # Static assets
├── src/
│   ├── App.tsx            # App root component
│   ├── App.css            # App styling
│   ├── index.css          # Global CSS
│   ├── main.tsx           # React app bootstrap
│   ├── api/
│   │   └── axiosClient.ts # Axios client with CRUD methods
│   ├── components/
│   │   └── UserCrud.tsx   # Main CRUD UI logic
│   └── types/
│       └── User.ts        # User interface
└── README.md
```

## Installation

1. Open a terminal in the project root.
2. Install the dependencies:

```bash
npm install
```

This will install React, Vite, Axios, Fluent UI, TypeScript, and JSON Server.

## Running the Application

You need to start two processes:

### 1) Start the JSON Server backend

Run:

```bash
npm run server
```

This starts the mock backend on:

```bash
http://localhost:3001
```

The `db.json` file is used as the data source. The base API routes are:

- `GET /users` - fetch all users
- `POST /users` - create a new user
- `PUT /users/:id` - update a user
- `DELETE /users/:id` - delete a user

### 2) Start the React frontend

Open a second terminal and run:

```bash
npm run dev
```

This starts the Vite development server, usually on:

```bash
http://localhost:5173
```

Open that URL in your browser to use the app.

## Available Scripts

The following scripts are defined in `package.json`:

```bash
npm run dev
```
Runs the Vite development server with hot reloading.

```bash
npm run build
```
Creates a production build for deployment.

```bash
npm run preview
```
Serves the built project locally for preview.

```bash
npm run server
```
Runs the JSON Server API watcher on port 3001.

```bash
npm run lint
```
Runs ESLint checks across the project.

## How the App Works

### Form Behavior

The main CRUD form includes fields for:

- Name
- Email
- Username

When a user clicks the main button:

- If `editId` is empty, the app creates a new user
- If a user is being edited, the app updates the selected user

Before submission, the app checks whether all fields are filled. If any field is empty, it shows an alert and stops the action.

### Read Flow

The app loads users on mount and whenever the edit state changes. It calls `getUsers()` from the API layer and stores the result in local state.

### Create Flow

The app sends a `POST` request to `/users` with the user object and updates the local table immediately after the API responds.

### Update Flow

When the user clicks Edit, the selected record is loaded into the form. After editing and submitting, the app sends a `PUT` request to `/users/:id` and updates the matching row in the table.

### Delete Flow

When the user clicks Delete, the app sends a `DELETE` request to `/users/:id` and removes that user from the UI.

## API Layer

The Axios client is defined in `src/api/axiosClient.ts`.

It creates a client with:

```ts
baseURL: "http://localhost:3001"
```

The file exports methods such as:

- `getUsers()`
- `createUser(user)`
- `updateUser(id, user)`
- `deleteUser(id)`

These methods wrap Axios requests and return typed TypeScript results.

## Data Model

The `User` interface is defined in `src/types/User.ts`:

```ts
export interface User {
  id?: number;
  name: string;
  email: string;
  username: string;
}
```

This means the application expects each user record to have a name, email, and username. The `id` is optional because it may be generated by the backend.

## Local Storage / Persistence

This project does not use browser local storage. Instead, it persists data through JSON Server. Each create, update, and delete action modifies the contents of `db.json`.

## Common Troubleshooting

### Vite app does not open

Make sure the frontend is running:

```bash
npm run dev
```

If the app is still not loading, check whether port 5173 is already in use and whether Vite chose another port.

### API connection error

If requests fail, ensure the backend is running:

```bash
npm run server
```

Also verify that the API is listening on port 3001.

### Data not updating after CRUD action

Check the browser console for network errors and verify your API server is still active.

### JSON Server not found

Run:

```bash
npm install
```

This ensures `json-server` is present in the project dependencies.

## Production Build

To create a production build:

```bash
npm run build
```

The generated build files are placed in the `dist` folder.

To preview the production build locally:

```bash
npm run preview
```

## Notes

- This project is intentionally lightweight and is a great example of a frontend CRUD app with a mock local backend.
- It is ideal for learning React state management, API communication with Axios, and simple database interactions using JSON Server.
- The app is best suited for development and demonstration purposes rather than production-grade enterprise usage.

## License

This project is available for learning and personal use. If you are using it in a classroom or project environment, you can extend or modify it freely.

## Quick Start Summary

```bash
npm install
npm run server
npm run dev
```

Then open:

```bash
http://localhost:5173
```

And make sure the backend is reachable at:

```bash
http://localhost:3001
```

---

This README provides a full guide for setting up, running, and understanding the React Axios CRUD project.
