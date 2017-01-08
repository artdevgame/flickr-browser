FROM node:alpine
MAINTAINER me@mikeholloway.co.uk
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install
COPY server.js /app
EXPOSE 80
CMD ["npm", "start"]