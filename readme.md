## Admin Dashboard (Vite + React + TS)

Vite + React + TypeScript starter with Vitest, Testing Library, ESLint (flat), and Prettier.

### Prerequisites
- Node.js 18+ and npm.

### Setup
1) Install deps: `npm install`
2) Start dev server: `npm run dev`

### Scripts
- `npm run dev` — start Vite dev server
- `npm run build` — production build
- `npm run preview` — preview production build
- `npm run lint` — run ESLint
- `npm test` — run Vitest in watch mode
- `npm run coverage` — run tests with coverage
- `npm run format` / `npm run format:write` — check or write Prettier formatting

### Git hooks
- Husky runs on `prepare` to wire hooks; ensure `npm install` has been run so `.husky/pre-commit` exists.
- Pre-commit runs `npm run lint -- --max-warnings=0`, `npm run format`, and `npx lint-staged` on staged files.

### Testing
- Unit/UI tests live in `src/` and use Vitest + Testing Library.
- Jest-DOM matchers are configured in `src/setupTests.ts`.

### Notes
- ESLint uses the flat config (`eslint.config.js`).
- Vitest config is co-located in `vite.config.ts` under `test`.
