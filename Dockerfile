# Fly.io Dockerfile for the API server
# Uses node:18-alpine; installs all deps (including dev) because the server runs via tsx
FROM node:18-alpine

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --omit=optional

# Copy source
COPY . .

ENV NODE_ENV=production
ENV PORT=4000

# Expose the port Fly will proxy to
EXPOSE 4000

# Start the API (server is in TypeScript, run with tsx)
CMD ["npm", "run", "api"]
