.. option:: --schemaSource <db-name>

   
   .. versionadded:: 2.11
   
   Required whenever the :option:`--schemaMode <mongosqld --schemaMode>`
   is set. Specifies the database where the schema information is stored.
   
   .. note::
   
      If you do not specify any of the :option:`--schema`,
      :option:`--schemaMode <mongosqld --schemaMode>`, and
      ``--schemaSource`` options, :binary:`~bin.mongosqld` holds its
      schema in memory.
   
   .. include:: /includes/sampling-ref-chart-link.rst
   

