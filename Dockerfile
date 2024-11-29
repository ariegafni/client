# Use an official Node.js runtime as a parent image
FROM node:16 AS build

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY ./client/package.json ./client/package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application into the container
COPY ./client ./

# Build the app
RUN npm run build

# Start a static server to serve the build
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
