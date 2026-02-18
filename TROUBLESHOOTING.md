# Troubleshooting Guide

## Prisma Error: P1000 (Authentication failed)
**Problem:** The username or password in `server/.env` is incorrect.

**Solution:**
1.  Open `server/.env` file.
2.  Check `DATABASE_URL`. It looks like:
    `postgresql://USER:PASSWORD@localhost:5432/DATABASE_NAME`
3.  Replace `USER` and `PASSWORD` with your actual PostgreSQL credentials.
    -   Default user is often `postgres`.
    -   Default password might be `password`, `1234`, `postgres`, or your Windows password.
4.  Example for user `postgres` and password `1234`:
    `postgresql://postgres:1234@localhost:5432/todo_db`

## Prisma Error: P1001 (Can't reach database server)
This error means your backend cannot connect to the PostgreSQL database.

**Possible Causes:**
1.  **PostgreSQL is not running**: This is the most common cause.
2.  **Wrong Port**: Your database might not be on port 5432.

**Solutions:**
1.  **Start PostgreSQL**:
    -   Search for "pgAdmin" or "Services" in Windows Start menu.
    -   Find "postgresql-x64-xx" service and Start it.
2.  **Check Port**:
    -   Run `netstat -an | findstr 5432` in terminal.

## Tailwind CSS Issues
If styles are not loading:
1.  Make sure you are using the latest `vite.config.ts` with `@tailwindcss/vite`.
2.  Restart the client server: `Ctrl+C` -> `npm run dev`.

## Prisma Version Issue
If you see `The datasource property url is no longer supported`:
1.  Reinstall stable Prisma:
    ```bash
    cd server
    npm uninstall prisma @prisma/client
    npm install prisma@5.10.2 @prisma/client@5.10.2 --save-exact
    npx prisma generate
    ```
