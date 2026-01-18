# Admin Dashboard

A modern, full-stack admin dashboard built with React, TypeScript, and Vite. Features a responsive layout with navigation, user management, assessment tracking, and analytics dashboard with mock API integration. Optimized with lazy-loaded routes, virtualized lists, and Web Vitals monitoring.

## 🚀 Features

- **Responsive Design** — Mobile-first layout with collapsible navigation
- **User Management** — View and manage user accounts
- **Assessment Tracking** — Create, view, and manage assessments with paginated tables
- **Dashboard Analytics** — Overview of key metrics and statistics
- **Lazy-Loaded Routes** — Code splitting for optimal initial load performance
- **Efficient Tables** — Paginated tables for assessments and users
- **Mock API** — Built-in Express server for development
- **React Query** — Efficient data fetching and caching
- **Toast Notifications** — User-friendly feedback system
- **Dark/Light Theme Toggle** — Switch between dark and light themes from the header; Tailwind configured for `class`-based dark mode

## 🛠️ Technologies Used

### Frontend

- **React 18** — UI library
- **TypeScript** — Type-safe development
- **Vite** — Fast build tool and dev server
- **React Router** — Client-side routing with lazy-loaded components
- **TanStack Query (React Query)** — Server state management
- **Tailwind CSS** — Utility-first CSS framework
- **(note)** `react-window` was explored but removed from the assessments table due to `table`/`tbody` compatibility; the app uses paginated standard tables.

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

3. **Start the development server** (Vite dev server on port 5173)

   ```bash
   npm run dev
   ```

   The app will open at `http://localhost:5173`

4. **Start the mock API server** (in a separate terminal on port 3001)

   ```bash
   npm run api
   ```

   API endpoints: `http://localhost:3001`

5. **Verify the setup**
   - Frontend should be running at `http://localhost:5173`
   - API should be running at `http://localhost:3001`
   - Navigation menu shows Dashboard, Assessments, and Users routes
   - Lazy-loaded routes will show loading spinner on first navigation

## 📜 Available Scripts

### Development

- `npm run dev` — Start Vite dev server with HMR
- `npm run api` — Start mock Express API server
- `npm run build` — Create optimized production build
- `npm run preview` — Preview production build locally

### Testing & Quality

- `npm test` — Run Vitest once with verbose reporter (suitable for CI, equivalent to `npx vitest run --reporter verbose`)
- `npm run test:watch` — Run Vitest in interactive watch mode (developer workflow)

Vitest is configured to only include project tests — `src/**/*.test.{ts,tsx}` — and explicitly excludes `node_modules` and `e2e/`.

- `npm run coverage` — Run tests with coverage report
- `npm run lint` — Run ESLint on all files
- `npm run typecheck` — Run TypeScript type checking
- `npm run format` — Check Prettier formatting
- `npm run format:write` — Apply Prettier formatting fixes

### Storybook

- `npm run storybook` — Start Storybook dev server
- `npm run build-storybook` — Build Storybook static site

### E2E Testing

- `npm run test:e2e` — Run Playwright end-to-end tests

## 🚀 Quick Start

```bash
# Install and run everything
npm install

# Terminal 1: Frontend dev server
npm run dev

# Terminal 2: Mock API server
npm run api

# Terminal 3 (optional): Watch tests
npm test
```

Then navigate to `http://localhost:5173` in your browser.

## 📊 Performance Optimizations

### Lazy-Loaded Routes

Routes are code-split using `React.lazy()` and `Suspense`:

- **Dashboard** — Loads on demand at `/dashboard`
- **Assessments** — Loads on demand at `/assessments`
- **Users** — Loads on demand at `/users`

This reduces initial bundle size and improves Time to Interactive (TTI).

### Assessments Table

The Assessments page renders a paginated, sortable table with create/edit/delete flows and server-driven pagination. Note: `react-window` was explored for virtualization but removed after it proved incompatible with `<table>/<tbody>` semantics — pagination and standard rendering are used for compatibility and accessibility.

Key behaviors:

- Sorting by column headers
- Pagination controls for navigating pages
- Modal form for create & edit actions (`AssessmentForm`)
- Confirmation-driven deletes and toast notifications

### Code Splitting

The production build automatically splits code into:

- `index.js` — Main app shell
- `Dashboard.js` — Dashboard page chunk
- `Assessments.js` — Assessments page chunk
- `Users.js` — Users page chunk

## 📁 Project Structure

```
admin-dashboard/
├── api/
│   └── server.ts              # Express mock API server
├── src/
│   ├── api/                   # API client functions
│   │   ├── assessments.ts
│   │   ├── client.ts
│   │   ├── dashboard.ts
│   │   ├── health.ts
│   │   └── users.ts
│   ├── assets/                # Static assets
│   ├── components/            # Reusable components
│   │   ├── AssessmentForm.tsx
│   │   ├── Layout.tsx         # Main layout with nav
│   │   ├── Modal.tsx
│   │   └── ToastContainer.tsx
│   ├── contexts/              # React context providers
│   │   └── ToastContext.tsx
│   ├── lib/                   # Libraries and utilities
│   │   ├── queryClient.ts
│   │   └── performanceMetrics.ts (optional)
│   ├── pages/                 # Page components (lazy-loaded)
│   │   ├── Dashboard.tsx
│   │   ├── Assessments.tsx    # Virtualized table
│   │   └── Users.tsx
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point with routing
│   └── index.css
├── e2e/                       # Playwright E2E tests
├── Dockerfile                 # Docker configuration
├── fly.toml                   # Fly.io deployment config
├── vite.config.ts             # Vite + Vitest config
└── package.json               # Dependencies and scripts
```

## 🧪 Testing

### Unit & Component Tests

```bash
npm test
```

- Tests located in `src/` alongside components
- Uses **Vitest** and **Testing Library**
- Accessibility checks using **axe-core** (see `src/App.a11y.test.tsx`) — axe runs in the Vitest environment and the color-contrast rule is disabled by default to avoid jsdom false positives
- Jest-DOM matchers in `src/setupTests.ts`
- Watch mode enabled by default

### Coverage Reports

```bash
npm run coverage
```

Generates coverage reports in `coverage/` directory.

### E2E Tests

```bash
npm run test:e2e
```

Playwright tests are located in the `e2e/` directory and include flows for Dashboard, Assessments (listing, create modal, error handling) and Users (listing and filters). The Playwright config includes a `webServer` entry so the dev server (`npm run dev`) is started automatically when running `npm run test:e2e` locally; you don't need to start the dev server manually. Use `npx playwright show-report` to open the last HTML report.

## 🔒 Git Hooks

**Husky** automatically enforces quality checks:

```bash
# Pre-commit hook runs:
- ESLint (zero warnings)
- Prettier format check
- lint-staged on staged files
```

All checks must pass before committing.

## 🐳 Docker

Build and run containerized:

```bash
# Build image
docker build -t admin-dashboard .

# Run container
docker run -p 5173:5173 -p 3001:3001 admin-dashboard
```

Access at `http://localhost:5173`

## 🚀 Deployment

### Fly.io

Configuration in `fly.toml`. Deploy with:

```bash
# Install Fly CLI: https://fly.io/docs/getting-started/installing-flyctl/
fly deploy
```

### Vercel

Configuration in `vercel.json`. Deploy from Git or:

```bash
# Install Vercel CLI
npm i -g vercel
vercel
```

## 📝 Notes

- ESLint uses modern **flat config** (`eslint.config.mts`)
- Vitest configured in `vite.config.ts`
- TailwindCSS dark theme with custom color tokens
- React Query client in `src/lib/queryClient.ts`
- Lazy routes with loading UI in `src/main.tsx`
- Paginated tables with standard rendering (react-window removed from `src/pages/Assessments.tsx` for compatibility)

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Ensure all tests pass: `npm test`
4. Ensure no lint errors: `npm run lint`
5. Format code: `npm run format:write`
6. Commit (git hooks will validate)
7. Open a pull request

## 📄 License

This project is private and not licensed for public use.
