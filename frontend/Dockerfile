# Dockerfile for React frontend
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

# Copy everything else including the .env file
COPY . .

# Build the app (env vars will be embedded here)
RUN npm run build

# Serve with static server (or add nginx if needed)
RUN npm install -g serve
CMD ["serve", "-s", "build", "-l", "3000"]
