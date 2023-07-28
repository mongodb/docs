.. option:: --schemaName <db-name>

   *Default*: ``defaultSchema``

   .. versionadded:: 2.11    
   
   Optional. The name of the schema to load from or write to
   the :option:`--schemaSource <mongosqld --schemaSource>` database.
   Specifying custom schema names allows you to store multiple schemas in
   the :option:`--schemaSource <mongosqld --schemaSource>` database.
   The behavior depends on the value of
   :option:`--schemaMode <mongosqld --schemaMode>`:
   
   .. list-table::
      :widths: 30 70
      :header-rows: 1
   
      * - :option:`--schemaMode <mongosqld --schemaMode>` Value
        - ``--schemaName`` Behavior
   
      * - ``custom``
        - The custom name of the schema to load from the database specified
          by the :option:`--schemaSource <mongosqld --schemaSource>`
          option.
   
      * - ``auto``
        - The name of the schema to write to the :option:`--schemaSource
          <mongosqld --schemaSource>` database after the |bi-short|
          samples the schema on startup.
   
   If you upload a custom schema, you must give it a name with
   :commandoption:`schema-name <name-schema>` and then specify this name to the
   :binary:`~bin.mongosqld` with :option:`--schemaName <mongosqld --schemaName>`.
   If you don't give a custom name to the schema that you upload, the schema
   name defaults to ``defaultSchema``. This results in an error from
   :binary:`~bin.mongosqld`, similar to the following: ``MongoDB schema not yet available``.

   .. include:: /includes/sampling-ref-chart-link.rst
   

