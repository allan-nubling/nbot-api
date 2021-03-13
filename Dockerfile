FROM node:14-alpine

WORKDIR /home/node/app

COPY package*.json .

COPY build ./build

ENV NODE_ENV=production 

RUN npm ci

USER node

EXPOSE 3000

CMD [ "node", "build/server.js" ]