You can disable all server-side execution of JavaScript:

- For a :binary:`~bin.mongod` instance by passing the
  :option:`--noscripting <mongod --noscripting>` option on the command
  line or setting :setting:`security.javascriptEnabled` to false in the
  configuration file.

- Starting in MongoDB 4.4, for a :binary:`~bin.mongos` instance by
  passing the :option:`--noscripting <mongos --noscripting>` option on
  the command line or setting :setting:`security.javascriptEnabled` to
  false in the configuration file. 
  
  | In earlier versions, MongoDB does not allow JavaScript execution on
    :binary:`~bin.mongos` instances.
