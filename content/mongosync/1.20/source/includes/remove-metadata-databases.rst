``mongosync`` stores its metadata in a database or multiple databases 
during migration. The metadata databases can be named any of the following: 

- ``__mdb_internal_mongosync``
- Anything beginning with ``__mdb_internal_mongosync_verifier``

You should drop any metadata databases after a successful migration. After
dropping metadata, it is not possible to reverse the migration.