.. option:: --schemaName <db-name>

   *Default*: ``defaultSchema``

   .. versionadded:: 2.11    
   
   Optional. The name of the schema to load from or write to
   the :option:`--schemaSource <mongosqld --schemaSource>` database.
   Specifying schema names allows you to store multiple schemas in
   the :option:`--schemaSource <mongosqld --schemaSource>` database.
   The behavior depends on on the value of
   :option:`--schemaMode <mongosqld --schemaMode>`:
   
   .. list-table::
      :widths: 30 70
      :header-rows: 1
   
      * - :option:`--schemaMode <mongosqld --schemaMode>` Value
        - ``--schemaName`` Behavior
   
      * - ``custom``
        - The name of the schema to load from the database specified
          by the :option:`--schemaSource <mongosqld --schemaSource>`
          option.
   
      * - ``auto``
        - The name of the schema to write to the :option:`--schemaSource
          <mongosqld --schemaSource>` database after the |bi-short|
          samples the schema on startup.
   
   If not specified, defaults to ``defaultSchema``.
   
   .. include:: /includes/sampling-ref-chart-link.rst
   

