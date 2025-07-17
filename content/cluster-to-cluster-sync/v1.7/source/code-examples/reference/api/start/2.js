db.adminCommand( {
   grantRolesToUser: "mongosync-user",
   roles: [ { role: "reverseSync", db: "admin" } ]
} )
