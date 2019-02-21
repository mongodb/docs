   db.getSiblingDB("$external").createUser(
   db.getSiblingDB("admin").createUser(
     {
       user : "<username>",
       user : "<x.509 subject>",
       user : "<Kerberos Principal>",
       pwd : "<password>",
       roles : [ 
         { role : "clusterAdmin", db : "admin" },
         { role : "readWriteAnyDatabase", db : "admin" },
         { role : "userAdminAnyDatabase", db : "admin" },
         { role : "dbAdminAnyDatabase", db : "admin" },
         { role : "backup", db : "admin" },
         { role : "restore", db : "admin" }
       ]
     }
   )
