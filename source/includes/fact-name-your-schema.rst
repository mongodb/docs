.. important::

   If you upload a custom schema, you must store it with its specified
   name, using :commandoption:`name-schema <name-schema>`, and then specify
   this name to the :binary:`~bin.mongosqld` with
   :option:`--schemaName <mongosqld --schemaName>`.
   If you don't store the schema's name when you upload it, the schema
   name defaults to ``defaultSchema``. If the schema's name doesn't exist,
   this results in an error from :binary:`~bin.mongosqld` similar to the
   following: ``MongoDB schema not yet available.
   Error initializing schema: no schema found for name.``.
