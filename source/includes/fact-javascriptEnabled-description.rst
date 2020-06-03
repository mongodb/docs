Enable or disable execution of operations that perform server-side
execution of JavaScript. 

- If your cluster runs a MongoDB version less than 4.4, this option
  corresponds to modifying the :setting:`security.javascriptEnabled`
  configuration file option for each :binary:`~bin.mongod` in the cluster.
  
- If your cluster runs MongoDB version 4.4 or greater, this option
  corresponds to  modifying the :setting:`security.javascriptEnabled`
  configuration file option for each :binary:`~bin.mongod` and
  :binary:`~bin.mongos` in the cluster.
