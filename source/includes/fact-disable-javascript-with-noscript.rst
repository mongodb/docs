You can disable all server-side execution of JavaScript:

- For a :binary:`~bin.mongod` instance by passing the
  :option:`--noscripting <mongod --noscripting>` option on the command
  line or setting :setting:`security.javascriptEnabled` to false in the
  configuration file.

- For a :binary:`~bin.mongos` instance by passing the 
  :option:`--noscripting <mongos --noscripting>` option on the command 
  line or setting :setting:`security.javascriptEnabled` to false in the 
  configuration file. 
  