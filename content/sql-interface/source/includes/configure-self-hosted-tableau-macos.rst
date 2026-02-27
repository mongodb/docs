Set Up On-Premise SQL Interface for Tableau on macOS
----------------------------------------------------

.. procedure::
   :style: normal

   .. step:: Install & Run the Schema Builder

      a. Download the `Schema Manager <https://www.mongodb.com/try/download/sql-schema-builder>`__.
      b. Move the downloaded file to a directory of your choice.
      c. Rename the downloaded file to ``mongodb-schema-manager``.
      d. Make the schema manager executable by running the following
         terminal command from the directory where you placed the file.

         .. code-block:: bash

            chmod +x mongodb-schema-manager

      e. Run the Schema Manager using a terminal command with your MongoDB URI
         like the example below. This command generates or regenerates the
         schema for your collections within the database.

         .. code-block:: bash

            ./mongodb-schema-manager --uri 'mongodb://<db_username>:<db_password>@<host>:<port>/<database>?authSource=admin'

      f. Verify the created SQL schema by looking for the ``__sql_schemas`` collection
         in your database. Inside this collection, there will be a document for each
         collection with its schema map and data type assignments.

   .. step:: Download and Install Your SQL Driver

      a. Download and install the JDBC MongoDB SQL driver.

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

      a. Download the MongoDB `Tableau Connector <https://www.mongodb.com/try/download/tableau-connector>`__.
      b. Place the MongoDB JDBC driver ``All JAR`` file in the Tableau Drivers directory.

         .. code-block::

            /Library/Tableau/Drivers/mongodb-jdbc-driver-all.jar

      c. Open :guilabel:`Tableau Desktop`, search for and select the "MongoDB SQL Interface by
         MongoDB Connector".

      d. Fill out the general connection information, including your MongoDB URI,
         Database, User Name, and Password.

      e. Your MongoDB collections appear as Tableau Tables. You can utilize the
         Custom SQL feature to leverage MongoSQL syntax to transform complex data
         by flattening nested objects and unwinding arrays.
