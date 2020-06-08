# Nginx Build
From nginx:alpine

MAINTAINER yaechanKim <burgund32@gmail.com>

# Erase Default config
RUN rm -rf /etc/nginx/conf.d

COPY ./webApp/proxy/conf /etc/nginx

WORKDIR /usr/share/nginx/html

EXPOSE 80

CMD ["/usr/sbin/nginx"]
