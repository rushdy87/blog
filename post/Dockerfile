#  Dockerfile for Post Service

# Import base image (Node.js on Alpine Linux for a lightweight container)
FROM node:alpine

# Set working directory inside the container
WORKDIR /app

# Copy package.json to the working directory
COPY package.json .

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Command to run the application
CMD [ "npm", "run", "dev" ]

# Notes about the Dockerfile:
# 1. This Dockerfile uses the official Node.js Alpine image for a smaller footprint.
# 2. It sets the working directory to /app inside the container.
# 3. It copies the package.json file first to leverage Docker's caching mechanism for npm install.
# 4. Finally, it copies the rest of the application code and specifies the command to start the application in development mode.
# 5. The application listens on port 3000 by default.
# 6. Ensure that the application code includes a start script in package.json for "npm run dev".
# 7. This Dockerfile is similar to those used in other services like moderation, event-bus, comments, and client for consistency.
# 8. To build the Docker image, use: docker build -t post-service (-t flag for additional tags).
# 9. To run the Docker container, use: docker run -p 3000:3000 post-service (-p flag to map container port to host port).
# 10. Adjust the port mapping as necessary based on your application's configuration.
# 11. Make sure to include a .dockerignore file to exclude unnecessary files from the Docker build context (like node_modules and logs).

# Most important docker commands:
# 1. Build the Docker image: docker build -t post-service .
# 2. Run the Docker container: docker run -p 3000:3000 post-service
# 3. Stop the Docker container: docker stop <container_id>
# 4. Remove the Docker container: docker rm <container_id>
# 5. List all Docker containers: docker ps -a
# Note that <container_id> can be found using the docker ps -a command.