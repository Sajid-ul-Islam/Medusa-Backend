# Book Publishing Platform

A multi-store book publishing platform built with Medusa.js backend and Next.js frontend.

## Monorepo Structure

```
/
├── apps/
│   ├── backend/          # Medusa.js e-commerce backend
│   ├── web/              # Next.js storefront
│   └── mobile/           # React Native app (future)
├── packages/
│   ├── shared-types/     # Shared TypeScript types
│   ├── shared-ui/        # Shared React components
│   └── shared-utils/     # Shared utilities
└── package.json          # Root workspace config
```

## Quick Start

```bash
# Install all dependencies
yarn install

# Run both backend and frontend in development
yarn dev

# Run only backend
yarn dev:backend

# Run only web frontend
yarn dev:web

# Build all apps
yarn build
```

## Architecture

This monorepo follows a modular architecture where:
- **apps/backend**: Medusa.js backend handling e-commerce logic, database, and APIs
- **apps/web**: Next.js storefront for web customers
- **apps/mobile**: Future React Native mobile application
- **packages/**: Shared code including types, UI components, and utilities

## Shared Packages

### @book-platform/shared-types
Contains all TypeScript interfaces, types, and enums used across the platform for type safety.

### @book-platform/shared-ui
Reusable UI components following the design system for consistent branding.

### @book-platform/shared-utils
Common utility functions for validation, formatting, API calls, etc.

## Development Guidelines

1. **Shared Code**: Put reusable code in `packages/` directory
2. **App-Specific Code**: Keep app-specific logic in respective `apps/` directory
3. **Type Safety**: Use shared types for API contracts between frontend and backend
4. **Component Library**: Build UI components in shared-ui for consistency

## Deployment

- **Backend**: Deploy to your preferred cloud provider (Heroku, Railway, AWS)
- **Web**: Deploy to Vercel (automatic detection of Next.js)
- **Mobile**: Build with Expo/Capacitor for iOS and Android
  Building blocks for digital commerce
