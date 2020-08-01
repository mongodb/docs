# Debian 9 ships with Python 3.5 which is not usable with mut
# (https://jira.mongodb.org/browse/DOP-1301, fixed by
# https://github.com/p-mongo/mut/commit/5beefc1c9ac2a9afabb86d918bfe598477b927e1).
# Debian 10 ships with Python 3.7 which is supposed to work but it doesn't
# per https://jira.mongodb.org/browse/DOP-1303.
# Use Debian 9 with the patch.
FROM debian:9

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && \
  apt-get -y install make git python-pip python3-pip \
    ruby yard pkg-config libxml2-dev && \
  python -m pip install giza && \
  python3 -m pip install mut

# Apply the fix in
# https://github.com/p-mongo/mut/commit/5beefc1c9ac2a9afabb86d918bfe598477b927e1
RUN git clone https://github.com/p-mongo/mut && \
  cd mut && \
  python3 setup.py install

WORKDIR /app

COPY . .

ENTRYPOINT ["./entrypoint.sh"]
