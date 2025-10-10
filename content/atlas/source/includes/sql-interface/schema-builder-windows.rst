.. step:: Install and Run the Schema Builder

   1. Download the `Schema Manager <https://www.mongodb.com/try/download/sql-schema-builder>`__.
   #. Move the downloaded file to a directory of your choice.
   #. Rename the downloaded file to ``mongodb-schema-manager`` and keep the 
      ``.exe`` extension.
   #. Run the Schema Manager using a terminal command with your MongoDB URI 
      as in the following example. This command generates or regenerates the 
      schema for your collections within the database.

      .. code-block:: bash

         ./mongodb-schema-manager.exe --uri 'mongodb://<db_username>:<db_password>@<host>:<port>/<database>?authSource=admin'

   #. Verify the created SQL schema by looking for the ``__sql_schemas`` collection
      in your database. This collection contains a list of documents where each document has the schema map and data type assignments for each collection.
