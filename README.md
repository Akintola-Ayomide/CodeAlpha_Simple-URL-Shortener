# Simple URL Shortner

A backend API for shortening URLs, managing link and redirections This project is built using Node.js, Express, and TypeScript

## Key Features & Progress

- ✅ **TypeScript Foundation**: Fully typed codebase for enhanced reliability and developer experience.
- ✅ **Modular Architecture**: Clean separation of concerns following the Controller-Service-Repository pattern.
- ✅ **Database Integration**: Integrated **MongoDB** with **Prisma ORM** for robust data persistence.
- ✅ **URL Shortening**: Generate unique, compact short codes for any valid URL.
- ✅ **Redirection**: Instant 302 redirection from short links to original destinations.
- ✅ **URL Management**: Endpoints to list all shortened URLs and view specific details.
- ✅ **Validation & Safety**: Robust input validation using `express-validator`.
- ✅ **Error Handling**: Standardized error responses for missing data and invalid inputs.
- ✅ **Rate Limiting**: Security layer to prevent API abuse and spamming (global and per-endpoint).
- ✅ **Automatic Expiration**: Background cleanup service that removes URLs 10 days after creation.

## API Endpoints

### URL Operations
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/api/urls/shorten` | Shorten a new URL (requires `originalUrl` in body) |
| `GET` | `/api/urls` | Get a list of all shortened URLs |
| `GET` | `/api/urls/:code` | Get details for a specific short code |
| `GET` | `/:code` | Redirect to the original URL |



## Project Structure

```text
src/
├── config/         # App configuration and environment variables
├── controllers/    # Route handlers (Request/Response logic)
├── lib/            # Shared libraries (Prisma client instance)
├── middleware/    # Custom Express middleware (Error handling, validation, rate limiting)
├── routes/         # API route definitions
├── services/       # Core business logic and background cleanup tasks
├── validations/    # Input validation schemas and rules
├── app.ts          # Express application setup
├── server.ts       # Server entry point
└── test-db.ts      # Database connection test script
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
