# Fly.io Dockerfile for the API server
# Uses node:20-alpine to satisfy engine ranges and installs all deps (including dev) because the server runs via tsx
FROM node:20-alpine

WORKDIR /app

# Install dependencies (include dev because tsx runs the TS sources directly)
COPY package.json package-lock.json ./
# npm ci fails when lock/package are out of sync; npm install is more forgiving for this service container
RUN npm install --omit=optional --legacy-peer-deps

# Copy source
COPY . .

ENV NODE_ENV=production
ENV PORT=4000

# Expose the port Fly will proxy to
EXPOSE 4000

# Start the API (server is in TypeScript, run with tsx)
CMD ["npm", "run", "api"]
