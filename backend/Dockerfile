# Base image
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

ENV DATABASE_URL: "postgresql://root:root123@localhost:5432/census_db?schema=public"

# Build the Prisma client
RUN npx prisma generate

# Expose the port that the app will run on
EXPOSE 8000

# Start the app
CMD ["npm","run","serve"]
