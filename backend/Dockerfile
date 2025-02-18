# Use official Node.js LTS image
FROM node:18

# Set working directory inside container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code into the container
COPY . .

# Expose API port
EXPOSE 3000

# Start the API (will be run by dockerize command locally)
CMD ["node", "server.js"]
