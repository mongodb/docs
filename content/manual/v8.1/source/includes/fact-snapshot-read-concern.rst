A query with read concern ``"snapshot"`` returns majority-committed data as it 
appears across shards from a specific single point in time in the recent past. 
Read concern ``"snapshot"`` provides its guarantees only if the transaction 
commits with write concern :writeconcern:`"majority"`.
