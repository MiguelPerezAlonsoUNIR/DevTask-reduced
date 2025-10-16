# Stage 1: Build the frontend
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN npm run build

# Stage 2: Serve the built frontend
FROM node:20

WORKDIR /app

# Copy built assets
COPY --from=builder /app/dist ./dist

# Install lightweight static server
RUN npm install -g serve

EXPOSE 4173

# Serve static files from dist/
CMD ["serve", "-s", "dist", "-l", "4173"]
