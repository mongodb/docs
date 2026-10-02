``mongosync`` stores its metadata in a database or multiple databases 
during migration. The metadata databases can be named any of the following: 

- ``__mdb_internal_mongosync``
- Anything beginning with ``__mdb_internal_mongosync_verifier``

Drop any metadata databases after a successful migration.

.. warning::

   If you started the migration with ``reversible`` set to ``true``,
   you cannot :ref:`reverse <c2c-reverse-process>` the migration after
   you drop the metadata databases.