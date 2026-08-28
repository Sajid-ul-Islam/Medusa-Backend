# API Layer

This directory contains the API connection layer that will be shared across web and mobile applications.

## Structure

```
api/
├── src/
│   ├── clients/          # API client implementations
│   ├── endpoints/        # Endpoint definitions
│   ├── hooks/            # React hooks for API calls (web/mobile)
│   └── types/            # API-specific types
└── README.md
```

## Setup Instructions

1. Create API client configuration
2. Define endpoint functions
3. Export shared hooks and utilities

## Environment Variables

Required environment variables for API connections:
- `NEXT_PUBLIC_API_URL` - Backend API base URL
- `API_KEY` - Optional API key for authentication
