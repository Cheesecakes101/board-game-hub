# Boardy - Board Game Rental Platform

## Overview
A React-based board game rental platform built with Vite, TypeScript, and Tailwind CSS. Users can browse games, join Saturday night events, and find their gaming community.

## Project Structure
- `src/` - Main source code
  - `components/` - Reusable UI components
  - `hooks/` - Custom React hooks
  - `lib/` - Utility functions
  - `pages/` - Page components
- `public/` - Static assets
- `index.html` - Entry HTML file

## Tech Stack
- React 18 with TypeScript
- Vite for development and building
- Tailwind CSS for styling
- Radix UI for accessible components
- React Router DOM for routing
- TanStack React Query for data fetching
- Recharts for data visualization

## Development
- Run `npm run dev` to start the development server on port 5000
- Run `npm run build` to create a production build
- Run `npm run preview` to preview the production build

## Deployment
Configured for static deployment. The build outputs to the `dist` directory.

## Recent Changes
- January 9, 2026: Migrated from Lovable to Replit environment
  - Updated Vite config for port 5000 and allowed hosts
  - Removed lovable-tagger dependency from vite config
  - Set up static deployment configuration
