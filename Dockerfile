FROM node:20-alpine3.19

RUN mkdir /l2vibeService

WORKDIR /l2vibeService

COPY . .

RUN npm install

EXPOSE 5000

CMD [ "npm", "run", "start"]
