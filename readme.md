# Admin Dashboard

A modern, full-stack admin dashboard built with React, TypeScript, and Vite. Features a responsive layout with navigation, user management, assessment tracking, and analytics dashboard with mock API integration.

## 🚀 Features

- **Responsive Design** — Mobile-first layout with collapsible navigation
- **User Management** — View and manage user accounts
- **Assessment Tracking** — Create, view, and manage assessments
- **Dashboard Analytics** — Overview of key metrics and statistics
- **Mock API** — Built-in Express server for development
- **React Query** — Efficient data fetching and caching
- **Toast Notifications** — User-friendly feedback system
- **Dark Theme** — Modern dark UI with Tailwind CSS

## 🛠️ Technologies Used

### Frontend

- **React 18** — UI library
- **TypeScript** — Type-safe development
- **Vite** — Fast build tool and dev server
- **React Router** — Client-side routing
- **TanStack Query (React Query)** — Server state management
- **Tailwind CSS** — Utility-first CSS framework

### Backend

- **Express.js** — Node.js web framework
- **CORS** — Cross-origin resource sharing
- **TypeScript** — Type-safe backend

### Development Tools

- **Vitest** — Unit testing framework
- **Testing Library** — React component testing
- **ESLint** — Code linting (flat config)
- **Prettier** — Code formatting
- **Husky** — Git hooks
- **lint-staged** — Pre-commit checks

### Deployment

- **Docker** — Containerization
- **Fly.io** — Platform for deployment

## 📋 Prerequisites

- **Node.js** 18+ and npm
- (Optional) Docker for containerized deployment

## ⚙️ Setup & Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd admin-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start the development server**

   ```bash
   npm run dev
   ```

4. **Start the mock API server** (in a separate terminal)

   ```bash
   npm run api
   ```

5. **Open your browser**
   - Frontend: `http://localhost:5173`
   - API: `http://localhost:3001`

## 📜 Available Scripts

- `npm run dev` — Start Vite dev server
- `npm run api` — Start mock Express API server
- `npm run build` — Create production build
- `npm run preview` — Preview production build
- `npm run lint` — Run ESLint
- `npm run typecheck` — Run TypeScript type checking
- `npm test` — Run Vitest in watch mode
- `npm run coverage` — Run tests with coverage report
- `npm run format` — Check Prettier formatting
- `npm run format:write` — Apply Prettier formatting

## 📁 Project Structure

```
admin-dashboard/
├── api/                    # Backend API
│   └── server.ts          # Express server
├── src/
│   ├── api/               # API client functions
│   ├── assets/            # Static assets
│   ├── components/        # Reusable components
│   │   ├── Layout.tsx     # Main layout with navigation
│   │   ├── Modal.tsx      # Modal component
│   │   └── ToastContainer.tsx
│   ├── contexts/          # React contexts
│   ├── lib/               # Libraries and utilities
│   ├── pages/             # Page components
│   │   ├── Dashboard.tsx
│   │   ├── Users.tsx
│   │   └── Assessments.tsx
│   ├── App.tsx            # Main app component
│   └── main.tsx           # App entry point
├── Dockerfile             # Docker configuration
├── fly.toml              # Fly.io deployment config
└── package.json          # Dependencies and scripts
```

## 🧪 Testing

- Unit and UI tests are located in `src/` alongside components
- Tests use **Vitest** and **Testing Library**
- Jest-DOM matchers configured in `src/setupTests.ts`
- Run tests with `npm test`
- Generate coverage reports with `npm run coverage`

## 🔒 Git Hooks

- **Husky** automatically sets up Git hooks during `npm install`
- **Pre-commit hook** runs:
  - ESLint with zero warnings policy
  - Prettier format check
  - lint-staged on staged files
- Ensure all checks pass before committing

## 🐳 Docker

Build and run with Docker:

```bash
docker build -t admin-dashboard .
docker run -p 5173:5173 admin-dashboard
```

## 🚀 Deployment

The project includes configuration for **Fly.io** deployment. See `fly.toml` for deployment settings.

## 📝 Notes

- ESLint uses the modern **flat config** (`eslint.config.mts`)
- Vitest configuration is in `vite.config.ts` under the `test` field
- TailwindCSS is configured for dark theme with custom color tokens
- React Query client configuration in `src/lib/queryClient.ts`

## 📄 License

This project is private and not licensed for public use.
