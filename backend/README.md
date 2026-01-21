# Admin CMS Backend

This is the backend for the Admin CMS, built with NestJS, TypeORM, and PostgreSQL.

## Features

- **Authentication**: JWT-based auth with Role-Based Access Control (RBAC).
- **Users**: Admin, Editor, Viewer roles.
- **Resources**: CRUD for content resources with pagination, sorting, and filtering.
- **Database**: PostgreSQL with TypeORM.

## Setup

1.  **Install Dependencies**:
    ```bash
    cd backend
    npm install
    ```

2.  **Environment Variables**:
    A `.env` file is created at `backend/.env`. Update the database credentials to match your local PostgreSQL setup.
    ```env
    DB_HOST=localhost
    DB_PORT=5432
    DB_USERNAME=postgres
    DB_PASSWORD=postgres
    DB_DATABASE=cms_db
    JWT_SECRET=supersecretkey_change_this_in_production
    PORT=3000
    ```

3.  **Run Migrations / Sync**:
    Currently, `synchronize: true` is enabled in `app.module.ts` for development convenience. This will automatically create tables.
    **Note**: For production, disable synchronization and use TypeORM migrations.

4.  **Start the Server**:
    ```bash
    npm run start:dev
    ```

## Authentication

- **Initial Admin User**:
    On the first run, if no admin exists with the email `admin@admin.com`, the system will seed one:
    - **Email**: `admin@admin.com`
    - **Password**: `admin123`

- **Login**:
    `POST /api/auth/login`
    ```json
    {
      "email": "admin@admin.com",
      "password": "admin123"
    }
    ```
    Returns `access_token` and user details.

- **Protected Routes**:
    Include the token in the `Authorization` header:
    `Authorization: Bearer <access_token>`

## API Endpoints

### Auth
- `POST /api/auth/login`: Login
- `GET /api/auth/profile`: Get current user profile (Protected)

### Resources
- `GET /api/resources`: List resources (pagination: ?page=1&limit=10&search=key)
- `GET /api/resources/:id`: Get resource details
- `POST /api/resources`: Create resource (Admin/Editor)
- `PATCH /api/resources/:id`: Update resource (Admin/Editor)
- `DELETE /api/resources/:id`: Delete resource (Admin only)

## Project Structure

- `src/config`: Configuration files
- `src/database`: Database setup
- `src/auth`: Authentication logic (Guards, Strategies)
- `src/users`: User management and Admin seeding
- `src/resources`: CMS content resources
- `src/common`: shared utilities (Interceptors, filters)
