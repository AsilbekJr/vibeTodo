# Vibe Todo App

This is a full-stack Todo application built with:
- **Frontend**: React, Vite, Redux Toolkit, Tailwind CSS
- **Backend**: Node.js, Express, Prisma, PostgreSQL

## Getting Started

### Prerequisites
- Node.js installed
- PostgreSQL installed and running

### Setup

1. **Database Configuration**:
   - Create a PostgreSQL database (e.g., `todo_db`).
   - Open `server/.env` and update `DATABASE_URL` with your credentials:
     ```env
     DATABASE_URL="postgresql://your_user:your_password@localhost:5432/todo_db"
     ```

2. **Database Migration**:
   Run the following command in the `server` directory to create tables:
   ```bash
   cd server
   npx prisma migrate dev --name init
   ```

3. **Running the App**:
   You can start both the server and client using the provided script:
   - **Windows**: Double-click `start-dev.bat`
   - **Manual**:
     ```bash
     # Terminal 1
     cd server
     npm run dev

     # Terminal 2
     cd client
     npm run dev
     ```

## Features
- **Dashboard**: View progress and manage tasks.
- **Danger Zone**: Highlights unfinished tasks.
- **Responsive UI**: Built with Tailwind CSS for a modern look.
