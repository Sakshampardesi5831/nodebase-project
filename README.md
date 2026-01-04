# Nodebase Project

A modern full-stack application built with Next.js, featuring authentication, database management, and workflow automation.

## Tech Stack

- **Framework**: Next.js 15.5.4 with Turbopack
- **Authentication**: Better Auth with email/password
- **Database**: PostgreSQL with Prisma ORM
- **API**: tRPC for type-safe APIs
- **UI**: Tailwind CSS with Radix UI components
- **Workflows**: Inngest for background jobs
- **Process Management**: mprocs for multi-process development

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── (auth)/         # Authentication pages
│   ├── api/            # API routes
│   └── globals.css     # Global styles
├── components/         # Reusable UI components
│   └── ui/            # Shadcn/ui components
├── features/          # Feature-specific components
│   └── auth/          # Authentication features
├── lib/               # Utility libraries
│   ├── auth.ts        # Better Auth configuration
│   ├── db.ts          # Prisma client setup
│   └── utils.ts       # Utility functions
├── trpc/              # tRPC configuration
│   ├── routers/       # API route definitions
│   ├── client.tsx     # Client-side tRPC
│   └── server.tsx     # Server-side tRPC
└── inngest/           # Inngest workflow functions
```

## Database Schema

### Models
- **User**: User accounts with authentication
- **Session**: User sessions for Better Auth
- **Account**: OAuth account linking
- **Verification**: Email verification tokens
- **Workflow**: Custom workflow management

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables in `.env`:
```env
DATABASE_URL="postgresql://..."
BETTER_AUTH_SECRET="your-secret-key"
BETTER_AUTH_URL="http://localhost:3000"
```

4. Set up the database:
```bash
npm run migrate
npm run generate
```

### Development

#### Single Process
```bash
npm run dev          # Next.js development server
npm run inngest-dev  # Inngest development server
npm run studio       # Prisma Studio
```

#### Multi-Process (Recommended)
```bash
npm run dev:all      # Runs all processes via mprocs
```

This will start:
- Next.js dev server at http://localhost:3000
- Inngest dev server at http://localhost:8288
- Prisma Studio at http://localhost:5555

### Available Scripts

- `npm run dev` - Start Next.js development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome
- `npm run generate` - Generate Prisma client
- `npm run migrate` - Run database migrations
- `npm run studio` - Open Prisma Studio
- `npm run inngest-dev` - Start Inngest development server
- `npm run dev:all` - Start all development processes

## Authentication

The project uses Better Auth for authentication with:
- Email/password authentication
- Automatic sign-in after registration
- Session management
- Email verification

## API Routes

### tRPC Endpoints
- `getWorkflows` - Fetch user workflows
- `createWorkFlow` - Create new workflow

### Authentication Endpoints
- `/api/auth/sign-up/email` - Email registration
- `/api/auth/sign-in/email` - Email login
- `/api/auth/sign-out` - Logout

## Process Management

The project uses `mprocs.yaml` for managing multiple development processes:

```yaml
procs:
  inngest:
    cmd: ["npm.cmd", "run", "inngest-dev"]
  dev:
    cmd: ["npm.cmd", "run", "dev"]
  studio:
    cmd: ["npm.cmd", "run", "studio"]
```
