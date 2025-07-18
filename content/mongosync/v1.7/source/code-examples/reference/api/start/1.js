db.adminCommand( {
   createRole: "reverseSync",
   privileges: [ {
       resource: { cluster: true },
       actions: [ "setUserWriteBlockMode", "bypassWriteBlockingMode" ]
   } ],
   roles: []
} )
