To ensure that a single thread can read its own writes, use
:readconcern:`"majority"` read concern and :writeconcern:`"majority"`
write concern against the primary of the replica set.
