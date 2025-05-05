FROM node:latest

RUN mkdir /app
WORKDIR /app

COPY ./forward-args-to-backport.sh /forward-args-to-backport.sh

RUN npm install backport -g
ENTRYPOINT ["/forward-args-to-backport.sh"]
CMD []
