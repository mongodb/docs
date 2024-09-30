Enable or disable execution of operations that perform server-side
execution of JavaScript. 

- If your {+cluster+} runs a MongoDB version less than 5.0, this option
  corresponds to modifying the :setting:`security.javascriptEnabled`
  configuration file option for each :binary:`~bin.mongod` in the cluster.
  
- If your {+cluster+} runs MongoDB version 5.0 or greater, this option
  corresponds to  modifying the :setting:`security.javascriptEnabled`
  configuration file option for each :binary:`~bin.mongod` and
  :binary:`~bin.mongos` in the cluster.

- If your {+cluster+} runs MongoDB version 8.0, :guilabel:`Allow Server-Side JavaScript` 
  is disabled by default to improve security and performance. This option
  corresponds to the :setting:`security.javascriptEnabled`
  configuration file option for each :binary:`~bin.mongod` and
  :binary:`~bin.mongos` in the cluster.