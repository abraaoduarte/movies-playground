FROM node:16-alpine

WORKDIR /usr/src/app

COPY package*.json ./

COPY . .

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD [ "yarn", "start:prod" ]