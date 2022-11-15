FROM node:18

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

# CMD [ "node", "-r", "./tracing.js", "main.js" ]
CMD [ "npm", "start" ]