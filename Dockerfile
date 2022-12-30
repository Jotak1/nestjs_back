FROM node:16-alpine AS builder
RUN apk add --no-cache curl python3 py3-pip make g++
RUN mkdir -p coopeuch
WORKDIR coopeuch
COPY package*.json ./
COPY . .
RUN npm install
RUN npm run build
ENTRYPOINT ["node","./dist/src/main.js"]
