# Team Task Manager

A full-stack application for teams to create projects, assign tasks, and track progress with role-based access control.

## Features
- **Authentication**: Secure sign up and login with NextAuth (JWT & Bcrypt).
- **Role-Based Access Control (RBAC)**: 
  - **Admin**: Create projects, add tasks, assign team members, and update task statuses.
  - **Member**: View assigned tasks and update the status of their assigned tasks.
- **Projects & Tasks**: Organize work efficiently into projects.
- **Dashboard**: Track upcoming tasks, completed tasks, and overdue tasks at a glance.

## Tech Stack
- **Frontend**: Next.js (App Router), React, Tailwind CSS, Lucide React
- **Backend**: Next.js API Routes (RESTful APIs)
- **Database**: SQLite (Local Dev) / PostgreSQL (Production) with Prisma ORM
- **Authentication**: NextAuth.js

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone <your-github-repo-url>
   cd team-task-manager
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   The project is configured to use SQLite for local development. Run the following command to push the schema and generate the Prisma client:
   ```bash
   npx prisma db push
   ```

4. **Environment Variables:**
   A `.env` file is generated locally with `DATABASE_URL="file:./dev.db"`. 
   For NextAuth, you should also add a NextAuth secret:
   ```env
   NEXTAUTH_SECRET="your-super-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

5. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

## Deployment to Railway
1. Push your code to a GitHub repository.
2. Go to [Railway.app](https://railway.app/) and create a new project.
3. Provision a **PostgreSQL** database.
4. Update `prisma/schema.prisma` to use the `postgresql` provider:
   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```
5. Add a new service connected to your GitHub repository.
6. Set the following Environment Variables in Railway:
   - `DATABASE_URL`: (Railway provides this automatically if you link the DB)
   - `NEXTAUTH_SECRET`: A secure random string
   - `NEXTAUTH_URL`: Your deployed Railway domain URL
7. Set the build command to `npx prisma generate && npm run build` (Railway will usually detect this automatically from `package.json`).
8. Deploy!
