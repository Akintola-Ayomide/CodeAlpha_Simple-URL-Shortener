# Simple URL Shortner

A backend API for shortening URLs, managing link and redirections This project is built using Node.js, Express, and TypeScript

## Project Structure

src/
├── config/         # App configuration and environment variables
├── controllers/    # Route handlers
├── middleware/    # Custom Express middleware
├── routes/         # Route definitions
├── types/          # TypeScript interfaces and types
├── utils/          # Utility functions
├── app.ts          # Express app setup
└── server.ts       # Server entry point
```

## Getting Started

### Prerequisites
- Node.js
- npm

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```
2. Create/edit `.env` file with your configuration.

### Scripts
- `npm run dev`: Start development server with auto-reload.
- `npm run build`: Compile TypeScript to JavaScript.
- `npm run start`: Run the compiled production server.
