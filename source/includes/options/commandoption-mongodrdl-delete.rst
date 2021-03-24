.. commandoption:: delete

   Deletes a schema specified by its name or
   string representation of the
   :ref:`ObjectId <document-bson-type-object-id>`. 
   
   ``delete`` accepts the following options:
   
   .. list-table::
      :header-rows: 1
      :widths: 20 80
   
      * - Name
        - Description
   
      * - :option:`--schemaSource <mongodrdl --schemaSource>`
        - *Required.* Specifies the database where the schema information
          is stored.
   
      * - ``--name``
        - The name of the schema. To learn more about naming schemas,
          see the :commandoption:`name-schema <mongodrdl --name-schema>`
          command.
   
          *Required* if ``--schema`` is not specified.
   
      * - ``--schema``
        - The string representation of the
          :ref:`ObjectId <document-bson-type-object-id>` of the schema.
   
          *Required* if ``--name`` is not specified.
   
   For example, the following command deletes the schema with id
   ``5d7941dc6a26a3d0fc397284`` in the ``schemas`` database:
   
   .. code-block:: sh
   
      mongodrdl delete --schemaSource schemas --schema 5d7941dc6a26a3d0fc397284
   

