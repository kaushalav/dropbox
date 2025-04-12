# backend/Dockerfile

FROM node:18-alpine

WORKDIR /app

# Prevent copying large or unnecessary files
COPY .dockerignore .dockerignore

# Copy only package files first to leverage Docker layer caching
COPY package*.json ./
RUN npm install

# Then copy the rest
COPY . .

# Ensure uploads directory exists inside container
RUN mkdir -p uploads

# Expose backend port
EXPOSE 3001

# Start backend server
CMD ["node", "server.js"]
