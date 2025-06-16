.. option:: --schemaMode <[custom|auto]>

   *Default*: ``custom``

   .. versionadded:: 2.11
   
   Configures the :ref:`sampling mode <sampling-mode-chart>` of
   :binary:`~bin.mongosqld`. Must be used with the
   :option:`--schemaSource <mongosqld --schemaSource>` option.
   The following values determine the sampling behavior:
   
   .. list-table::
      :widths: 30 70
      :header-rows: 1
   
      * - Value
        - ``--schemaMode`` Behavior
   
      * - ``custom``
        - :binary:`~bin.mongosqld` reads a stored
          schema from the MongoDB database specified by the
          :option:`--schemaSource <mongosqld --schemaSource>` option.
   
      * - ``auto``
        - :binary:`~bin.mongosqld`
          samples the schema and writes the schema data to the MongoDB
          database specified by the
          :option:`--schemaSource <mongosqld --schemaSource>` option.
   
   For more information on configuring the sample mode, see the
   :ref:`sampling-mode-chart`.
   
   .. include:: /includes/fact-samplemode-write-permission.rst
   

