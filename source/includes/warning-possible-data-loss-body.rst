There is a small chance of data loss when using dollar (``$``) prefixed
field names or field names that contain periods (``.``) if these
field names are used in conjunction with unacknowledged writes
(:ref:`write concern <write-concern>` ``w=0``) on servers
that are older than MongoDB 5.0.

When running :dbcommand:`insert`, :dbcommand:`update`, and 
:dbcommand:`findAndModify` commands, drivers that are 5.0 compatible 
remove restrictions on using documents with field names that are 
dollar (``$``) prefixed or that contain periods (``.``). These field 
names generated a client-side error in earlier driver versions.

The restrictions are removed regardless of the server version the
driver is connected to. If a 5.0 driver sends a document to an older
server, the document will be rejected without sending an error.

