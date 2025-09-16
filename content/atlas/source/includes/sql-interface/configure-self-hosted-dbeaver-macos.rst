Set Up On-Premise SQL Interface for DBeaver on macOS
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

      7. Download and install either the JDBC or ODBC MongoDB SQL driver.

         .. list-table::
            :header-rows: 1
            :widths: 20 40 40

            * - Driver Type
              - Compatible Operating Systems
              - Installation Instructions

            * - **JDBC Driver**
              - macOS x86_64, macOS aarch64
              - :ref:`JDBC Installation Guide <sql-connect-jdbc>`

   .. step:: DBeaver Community
                  
      1. Launch DBeaver.

      2. Add a new driver.

         i. In DBeaver, click :guilabel:`Database` and select  
            :guilabel:`Driver Manager` from the dropdown menu.
   
         #. Click :guilabel:`New` to open the 
            :guilabel:`Create new driver` modal.

         #. In the :guilabel:`Settings` tab, enter the following 
            information:

            .. list-table::
               :stub-columns: 1
               :widths: 10 20
      
               * - Driver Name
                 - ``MongoDB``
           
               * - Class Name
                 - ``com.mongodb.jdbc.MongoDriver``

         #. In the :guilabel:`Libraries` tab, click 
            :guilabel:`Add File` and add your JDBC driver 
            ``all.jar`` file.

            Click :guilabel:`Find Class`.

         #. Click :guilabel:`OK`. The 
            :guilabel:`Create new driver` modal closes.

      3. Create a database connection.

         i. In DBeaver, click :guilabel:`Database` and select  
            :guilabel:`New Database Connection` from the dropdown 
            menu to open the :guilabel:`Connect to a database` modal.

         #. From the list of databases, select the ``MongoDB`` 
            database driver that you created in the previous step.

            If you don't see ``MongoDB``, select 
            the :guilabel:`All` category inside the modal.

            Click :guilabel:`Next`.

         #. In the :guilabel:`Main` tab, enter the following 
            information: 

            .. list-table::
               :stub-columns: 1
               :widths: 10 20
      
               * - JDBC URL
                 - Your connection string from step 5.

               * - Username
                 - The MongoDB user to connect with.

               * - Password
                 - The MongoDB user's password.

         #. In the :guilabel:`Driver properties` tab, expand 
            :guilabel:`User Properties`. Add the following key-value 
            properties:

            .. list-table::
               :stub-columns: 1
               :widths: 10 20

               * - database
                 - The name of your virtual database.

               * - user
                 - The MongoDB user to connect with. Not required if 
                   you entered a ``Username`` in the previous step.

               * - password
                 - The MongoDB user's password. Not required if you 
                   entered a ``Password`` in the previous step.

      4. Click :guilabel:`Finish`.