# Stage 1: compile and build angular codebase

# Use node image as the base image
FROM node:16.13.2 as build

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY package.json package-lock.json ./

# Install all the dependencies
RUN npm install

COPY . .

# Generate the build of the application
RUN npm run build

# Stage 2: Serve app with nginx server

# User nginx image as the base image
FROM nginx:latest

# Copy the build output to replace the default nginx contents
COPY --from=build /usr/src/app/dist/ht-app /usr/share/nginx/html

# Expose port 4200
#EXPOSE 4200

