# Use Node.js to build the SPA
FROM node:18 AS builder

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all files and build
COPY . .
RUN npm run build

# Use Nginx for hosting the built SPA
FROM nginx:alpine

# Copy build output to Nginx folder
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose Nginx port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
