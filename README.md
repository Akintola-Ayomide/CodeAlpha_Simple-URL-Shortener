# Simple URL Shortner

A backend API for shortening URLs, managing link and redirections This project is built using Node.js, Express, and TypeScript

## Key Features & Progress

- ✅ **TypeScript Foundation**: Fully typed codebase for enhanced reliability and developer experience.
- ✅ **Modular Architecture**: Clean separation of concerns following the Controller-Service-Repository pattern.
- ✅ **Database Integration**: Integrated **MongoDB** with **Prisma ORM** for robust data persistence.


## Project Structure

```text
src/
├── config/         # App configuration and environment variables
├── controllers/    # Route handlers (Request/Response logic)
├── lib/            # Shared libraries (Prisma client instance)
├── middleware/    # Custom Express middleware (Error handling, validation)
├── models/         # TypeScript interfaces and Data Transfer Objects
├── routes/         # API route definitions
├── services/       # Core business logic
├── types/          # Global TypeScript types
├── utils/          # Shared utility functions
├── app.ts          # Express application setup
└── server.ts       # Server entry point
```

## Getting Started

### Prerequisites
- Node.js (v14+)
- npm
- MongoDB URI

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env` file:
   ```env
   PORT=5000
   DATABASE_URL="your-mongodb-uri"
   ```

### Scripts
- `npm run dev`: Start development server with auto-reload (ts-node-dev).
- `npm run build`: Compile TypeScript to JavaScript for production.
- `npm run start`: Run the compiled production server from the `dist` folder.
