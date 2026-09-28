The server periodically advances the timestamp in highwatermark resume
tokens. On idle shards with infrequent writes, this advancement might
not occur frequently enough for some use cases. To advance the
highwatermark timestamp more frequently, you can write no-op entries
to the oplog on idle shards using the :dbcommand:`appendOplogNote`
command.
