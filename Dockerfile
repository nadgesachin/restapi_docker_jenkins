# Use Node.js Alpine image as the base image
FROM node:alpine

# Set the working directory in the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install Node.js dependencies
RUN npm install

# Copy the application files to the container
COPY . .

# Expose the port on which the app runs (change as needed)
EXPOSE 8000

# Command to start the application
CMD ["npm", "start"]
