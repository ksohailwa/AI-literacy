# Use official Node.js image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
# This copies everything, including the 'public' folder
COPY . .

# Expose port (change as needed)
EXPOSE 8080

# Start the application
CMD [ "npm", "start" ]


