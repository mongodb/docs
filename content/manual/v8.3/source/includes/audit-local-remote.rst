Starting in MongoDB 5.0, can alternatively be a document with one of
these fields:

- ``isSystemUser`` that indicates whether the user who
  caused the event was a system user. Logged for self-referential jobs
  initiated by a background process that runs on the same server
  instance.

- ``unix`` that contains the MongoDB socket file path if the client
  connects through a Unix domain socket.