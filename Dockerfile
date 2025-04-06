# Stage 1: Build the React app using Node
FROM node:18-alpine as build

WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the client code and build the app
COPY . .
RUN npm run build

# Stage 2: Serve the built app using a lightweight server (serve)
FROM node:18-alpine

RUN npm install -g serve

WORKDIR /app
COPY --from=build /app/dist ./dist

# Railway will provide the PORT env variable
EXPOSE ${PORT}

CMD sh -c "serve -s dist -l $PORT"
