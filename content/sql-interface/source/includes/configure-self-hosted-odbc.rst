Set Up On-Premise {+sql-interface+} for ODBC
--------------------------------------------

.. procedure::
   :style: normal

   .. step:: Install & Run the Schema Builder

      1. Download the `Schema Manager <https://www.mongodb.com/try/download/sql-schema-builder>`__.
      2. Move the downloaded file to a directory of your choice.
      3. Rename the downloaded file to ``mongodb-schema-manager``.
      4. Make the schema manager executable by running the following 
         terminal command from the directory where you placed the file.
   
         .. code-block:: bash

            chmod +x mongodb-schema-manager

      5. Run the Schema Manager using a terminal command with your MongoDB URI 
         like the example below. This command generates or regenerates the 
         schema for your collections within the database.

         .. code-block:: bash

            ./mongodb-schema-manager --uri 'mongodb://<db_username>:<db_password>@<host>:<port>/<database>?authSource=admin'

      6. Verify the created SQL schema by looking for the ``__sql_schemas`` collection
         in your database. Inside this collection, there will be a document for each
         collection with its schema map and data type assignments.

   .. step:: Download and Install Your SQL Driver

      Follow the instructions in the :ref:`ODBC Installation Guide <sql-connect-odbc>` 
      to download and install the ODBC MongoDB SQL driver.
