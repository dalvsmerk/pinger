FROM node:14-alpine

WORKDIR /usr/src/app

COPY package*.json ./

# Freeze dependencies and install
RUN npm ci

COPY . .

EXPOSE 3000
CMD ["node", "index.js"]
