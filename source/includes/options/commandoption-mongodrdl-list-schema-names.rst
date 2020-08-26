.. commandoption:: list-schema-names

   Lists the name and string representation of the
   :ref:`ObjectId <document-bson-type-object-id>` for each stored schema
   that has a name.
   
   .. include:: /includes/fact-mongodrdl-schema-name.rst
   
   ``list-schema-names`` requires the following option:
   
   .. list-table::
      :header-rows: 1
      :widths: 25 75
   
      * - Name
        - Description
   
      * - :option:`--schemaSource <mongodrdl --schemaSource>`
        - *Required.* Specifies the database where the schema information
          is stored.
   
   For example, the following command returns the name and ObjectId for
   each named schema in the ``schemas`` database:
   
   .. code-block:: sh
   
      mongodrdl list-schema-names --schemaSource schemas
   
   The output resembles the following:
   
   .. code-block:: sh
      :copyable: false
   
      movies 5d72ad695c23a9e3e26e3c85
      theaters 5d72adea5c23a9e44882a1ad
   

