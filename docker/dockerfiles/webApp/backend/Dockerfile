FROM node:latest

MAINTAINER yaechanKim <burgund32@gmail.com>

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY ./webApp/ .

RUN npm install

EXPOSE 8080

CMD ["npm", "start"]