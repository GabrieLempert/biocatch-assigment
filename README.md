# BioCatch SPA Integration Assignment

A lightweight React Single Page Application (SPA) built with Vite to demonstrate the integration of the BioCatch SDK. This application simulates a user journey (Home → Login → Dashboard → Payment -> Logout) while tracking user behavior and simulating server-side risk scoring.

## Features

- **React SPA Routing:** Custom state-based routing without external heavy dependencies.
- **Global State Management:** Uses React Context to manage and share the `customerSessionId` across the application.
- **BioCatch SDK Integration:** 
  - Loaded globally via CDN.
  - Tracks page views using `cdApi.changeContext()`.
  - Captures and forwards global button clicks using event delegation.
- **API Flow Simulation:** 
  - Simulates backend API calls for `init` (Login) and `getScore` (Payment) using native `fetch`.
  - Bypasses CORS issues utilizing a local Vite proxy that forwards requests to a dummy webhook endpoint (`webhook.site` or `zapier`).

## Project Structure

- `index.html` - Entry point where the BioCatch CDN script is injected.
- `src/App.jsx` - Main application container, router, and global click tracker.
- `src/provider.jsx` & `src/context.jsx` - Global state management for the Session ID.
- `src/Components/` - Individual views for the application:
  - `HomePage.jsx` - Public landing page.
  - `Login.jsx` - Simulates user authentication and triggers the `init` API call.
  - `AccountDashboard.jsx` - Protected user dashboard displaying the active Session ID.
  - `Payment.jsx` - Simulates a transaction and triggers the `getScore` API call.
- `vite.config.js` - Configuration file including the local development proxy.

## Setup and Installation

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the local development server:
   ```bash
   npm run dev
   ```
