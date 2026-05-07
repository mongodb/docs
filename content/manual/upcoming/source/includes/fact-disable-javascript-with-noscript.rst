To disable all server-side execution of JavaScript for
:binary:`~bin.mongod` or :binary:`~bin.mongos`, you can either:

- Pass the ``--noscripting`` option on the command line. See
  :option:`mongod --noscripting` and
  :option:`mongos --noscripting`.

- Set :setting:`security.javascriptEnabled` to false in the
  configuration file.
