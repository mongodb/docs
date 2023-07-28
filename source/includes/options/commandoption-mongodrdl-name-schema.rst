.. commandoption:: name-schema

   Creates a new name for a schema or updates a schema's existing name.
   
   .. include:: /includes/fact-mongodrdl-schema-name.rst
   
   ``name-schema`` requires the following options:
   
   .. list-table::
      :header-rows: 1
      :widths: 30 70
   
      * - Name
        - Description
   
      * - :option:`--schemaSource <mongosqld --schemaSource>`
        - *Required.* Specifies the database where the schema information
          is stored.
   
      * - :option:`--schemaName <mongosqld --schemaName>`
        - *Required.* The new name of the schema.
   
      * - :option:`--schema <mongosqld --schema>`
        - *Required* The string representation of the
          :ref:`ObjectId <document-bson-type-object-id>` of the schema.
   
   For example, the following command names the
   ``5d72adea5c23a9e44882a1ad`` schema in the ``schemas`` database as
   ``movies``:
   
   .. code-block:: sh
   
      mongodrdl name-schema --schemaName movies --schemaSource schemas --schema 5d72adea5c23a9e44882a1ad
   

