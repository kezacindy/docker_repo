# Use an official Node.js runtime as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json from backend folder to the working directory
COPY backend/package*.json ./

# Install dependencies
RUN npm install

# Copy the entire backend folder's content into the container
COPY backend/. .

# Expose the port your backend runs on (assuming it's 5000)
EXPOSE 5000

# Command to run the application
CMD ["npm", "start"]
