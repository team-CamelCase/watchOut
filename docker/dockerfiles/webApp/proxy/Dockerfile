# Build React app
FROM node:12 as react-builder

MAINTAINER yaechanKim <burgund32@gmail.com>

WORKDIR /usr/src/web

ENV PATH /usr/src/web/node_modules/.bin:$PATH

COPY ./webApp/proxy/web/package*.json /usr/src/web/

RUN npm install

COPY ./webApp/proxy/web /usr/src/web

RUN npm run build

# Nginx Build
From nginx:alpine

MAINTAINER yaechanKim <burgund32@gmail.com>

# Erase Default config
RUN rm -rf /etc/nginx/conf.d

COPY ./webApp/proxy/conf /etc/nginx

WORKDIR /usr/share/nginx/html

COPY --from=react-builder /usr/src/web/build /usr/share/nginx/html

EXPOSE 80

CMD ["/usr/sbin/nginx"]
