``mongosync`` stores its metadata in a database or multiple databases 
during migration. The metadata databases can be named any of the following: 

- ``mongosync_reserved_for_internal_use``
- Anything beginning with ``mongosync_internal_``
- Anything beginning with ``mongosync_reserved_for_verification_``

You should drop any metadata databases after a successful migration. After
dropping metadata, it is not possible to reverse the migration.