.. commandoption:: upload

   Uploads the schema from the specified ``.drdl`` file to the database
   specified by the :option:`--schemaSource <mongodrdl --schemaSource>`
   option. Schemas are uploaded to the ``schemas`` collection.
   
   ``upload`` requires the following options:
   
   .. list-table::
      :header-rows: 1
      :widths: 25 75
   
      * - Name
        - Description
   
      * - :option:`--schemaSource <mongodrdl --schemaSource>`
        - *Required.* Specifies the database where the schema information
          is stored.
   
      * - ``--drdl``
        - *Required.* Path to the ``.drdl`` file to upload.
   
   For example, the following command uploads the schema in the
   ``movies.drdl`` file to the ``schemas`` database:
   
   .. code-block:: sh
   
      mongodrdl upload --schemaSource schemas --drdl ./movies.drdl 
   
   The string representation of the
   :ref:`ObjectId <document-bson-type-object-id>` of the uploaded schema
   is returned:
   
   .. code-block:: sh
      :copyable: false
   
      5d793f3f6a26a3ce66c304ea

   The next step is to store the schema under a name you provide, using
   the :commandoption:`name-schema <name-schema>` command:

   .. code-block:: sh
   
      mongodrdl name-schema --name movies --schemaSource schemas --schema 5d793f3f6a26a3ce66c304ea
   
   To use the newly uploaded schema that received a specified name,
   restart :binary:`~bin.mongosqld` with the schema database specified by the
   :option:`--schemaSource <mongosqld --schemaSource>` option, with the
   schema's name specified with :option:`--schemaName <mongosqld --schemaName>`:
   
   .. code-block:: sh
   
      mongosqld --schemaSource <schema-db> --schemaName movies
   
   .. include:: /includes/fact-name-your-schema.rst
