# Stage 1: Build the frontend
FROM node:20-alpine AS build-frontend
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install
COPY frontend/ ./
RUN npm run build

# Stage 2: Serve backend and built frontend
FROM node:20-alpine
WORKDIR /app/backend

# Install backend dependencies
COPY backend/package*.json ./
RUN npm install

# Copy backend source code
COPY backend/ ./

# Copy built frontend from Stage 1 into the expected directory
COPY --from=build-frontend /app/frontend/dist /app/frontend/dist

# Expose backend port
EXPOSE 5000

# Start the server
CMD ["node", "server.js"]
