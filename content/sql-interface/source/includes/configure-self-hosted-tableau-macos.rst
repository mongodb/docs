Set Up On-Premise SQL Interface for Tableau on macOS
----------------------------------------------------

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

      1. Download and install the JDBC MongoDB SQL driver.

         .. list-table::
            :header-rows: 1
            :widths: 20 40 40

            * - Driver Type
              - Compatible Operating Systems
              - Installation Instructions

            * - **JDBC Driver**
              - macOS x86_64, macOS aarch64
              - :ref:`JDBC Installation Guide <sql-connect-jdbc>`

   .. step:: Tableau Desktop

      1. Download the MongoDB `Tableau Connector <https://www.mongodb.com/try/download/tableau-connector>`__.
      2. Place the MongoDB JDBC driver ``All JAR`` file in the Tableau Drivers directory. 

         .. code-block::

            /Library/Tableau/Drivers/mongodb-jdbc-driver-all.jar

      3. Open :guilabel:`Tableau Desktop`, search for and select the "MongoDB SQL Interface by
         MongoDB Connector".

      4. Fill out the general connection information, including your MongoDB URI, 
         Database, User Name, and Password.

      5. Your MongoDB collections appear as Tableau Tables. You can utilize the 
         Custom SQL feature to leverage MongoSQL syntax to transform complex data 
         by flattening nested objects and unwinding arrays.
