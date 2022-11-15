FROM node:17
WORKDIR /usr/src/server
COPY * ./
RUN npm install
CMD [ "node", "-r", "./tracing.js", "app.js"  ]