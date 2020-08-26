.. commandoption:: download

   Downloads a schema specified by its name or
   string representation of the
   :ref:`ObjectId <document-bson-type-object-id>` and prints it to the
   console.
   
   ``download`` accepts the following options:
   
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
          see the :commandoption:`name-schema <name-schema>`
          command.
   
          *Required* if ``--schema`` is not specified.
   
      * - ``--schema``
        - The string representation of the
          :ref:`ObjectId <document-bson-type-object-id>` of the schema.
   
          *Required* if ``--name`` is not specified.
   
   For example, the following command prints the ``movies`` schema to the
   console:
   
   .. code-block:: sh
   
      mongodrdl download --schemaSource schemas --name movies
   
   To store the schema in a ``.drdl`` file, direct the output to the
   desired ``.drdl`` file:
   
   .. code-block:: sh
   
      mongodrdl download --schemaSource schemas --name movies > ./movies.drdl
   

