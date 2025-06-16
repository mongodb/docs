.. commandoption:: list-schema-ids

   Lists the string representation of the
   :ref:`ObjectId <document-bson-type-object-id>` of each stored schema
   and the date it was created.
   
   ``list-schema-ids`` requires the following option:
   
   .. list-table::
      :header-rows: 1
      :widths: 25 75
   
      * - Name
        - Description
   
      * - :option:`--schemaSource <mongodrdl --schemaSource>`
        - *Required.* Specifies the database where the schema information
          is stored.
   
   For example, the following command lists the schema ids in the
   ``schemas`` database:
   
   .. code-block:: sh
   
      mongodrdl list-schema-ids --schemaSource schemas
   
   The output resembles the following:
   
   .. code-block:: sh
      :copyable: false
   
      5d72ad695c23a9e3e26e3c85 2019-09-06T15:03:05.556Z
      5d72adea5c23a9e44882a1ad 2019-09-06T15:05:14.349Z
   

