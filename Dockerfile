FROM debian:9

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
  apt-get -y install make git python-pip python3-pip \
    ruby yard pkg-config libxml2-dev && \
  python -m pip install giza && \
  python3 -m pip install mut

WORKDIR /app

COPY . .

ENTRYPOINT ["./entrypoint.sh"]
