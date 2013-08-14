.. list-table::
   :header-rows: 1

   * - 

     - Single Server: in a :program:`mongo` shell connected to the server,
       

     - Replica Set: in a :program:`mongo` shell connected to the `primary <http://docs.mongodb.org/manual/core/replica-set-primary/>`_,
       

     - Sharded Cluster: in a :program:`mongo` shell connected to the :program:`mongos` instance,
       

   * - MMS Monitoring
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase" 
                               ]
                       } )
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase" 
                               ]
                       } )
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase" 
                               ]
                       } )
       

   * - MMS Monitoring with Database Profiling
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase" 
                                 "dbAdminAnyDatabase"
                               ]
                       } )
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase" 
                                 "dbAdminAnyDatabase"
                               ]
                       } )
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase" 
                                 "dbAdminAnyDatabase"
                               ]
                       } )
       

   * - MMS Backup
       

     - MMS Backup does not currently support standalone deployments.
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase"
                                 "readWrite",
                                 "userAdminAnyDatbase" 
                               ]
                       } )
       

     - .. code-block:: javascript   
       
          use admin
          db.addUser( { user: "agent",
                        pwd: "Moon1234",
                        roles: [ "clusterAdmin", 
                                 "readAnyDatabase"
                                 "readWrite",
                                 "userAdminAnyDatbase" 
                               ]
                       } )
       

