// start setUserWriteBlockMode example
db.adminCommand( {
   setUserWriteBlockMode: 1,
   global: false
} )
// end setUserWriteBlockMode example

// start drop db example
use mongosync_reserved_for_internal_use
db.dropDatabase()
// end drop db example

// start show dbs
show dbs
// end show dbs

// start drop dbs example
use <user database name>
db.dropDatabase()
// end drop dbs example

// start balancerStart example
db.adminCommand(
   {
     balancerStart: 1
   }
)
// end balancerStart example
