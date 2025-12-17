// :snippet-start: current-op-agg
db.adminCommand( { 
    aggregate : 1, 
    pipeline : [ { 
       $currentOp : { allUsers : true, idleConnections : true } }, { 
       $match : { shard : "shard01" } 
       } 
    ], 
    cursor : { } 
})
// :snippet-end: