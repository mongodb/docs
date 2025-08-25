FROM node:12-slim

RUN apt-get update && \
  apt-get upgrade -y && \
  apt-get install -y git && \
  apt-get install -y nodejs

COPY "entrypoint.sh" "/entrypoint.sh"

ENTRYPOINT ["/entrypoint.sh"]
