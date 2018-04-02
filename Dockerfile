FROM node:latest

WORKDIR /var/lib/src

COPY package.json ./

RUN npm install --only=production

COPY src ./src

CMD [ "npm", "start" ]