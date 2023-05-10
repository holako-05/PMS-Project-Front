# Use the official Node.js image as the base image
FROM node:14-alpine as build-stage

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the dependencies
RUN npm ci

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN npm run build

# Use the official Nginx image for serving the built frontend application
FROM nginx:1.21-alpine

# Copy the built files to the Nginx directory
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf
