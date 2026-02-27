Set Up On-Premise {+sql-interface+} for Tableau on Windows
------------------------------------------------------

.. procedure::
   :style: normal

   .. include:: /includes/schema-builder-windows.rst

   .. step:: Download and Install Your SQL Driver

      Download and install the JDBC MongoDB SQL driver.

      .. list-table::
         :header-rows: 1
         :widths: 20 40 40

         * - Driver Type
           - Compatible Operating Systems
           - Installation Instructions

         * - **JDBC Driver**
           - Windows x86_64
           - :ref:`JDBC Installation Guide <sql-connect-jdbc>`

   .. step:: Connect to Tableau Desktop

      a. Download the MongoDB `Tableau Connector <https://www.mongodb.com/try/download/tableau-connector>`__.
      b. Place the MongoDB JDBC driver JAR file in the Tableau Drivers directory.

         .. code-block::

            /file/path/to/mongodb-jdbc-driver.jar

      c. Open :guilabel:`Tableau Desktop`, search for and select the
         :guilabel:`MongoDB SQL Interface by MongoDB Connector`.

      d. Fill out the General Connection Information, including your MongoDB URI,
         Database, User Name, and Password.

      e. Your MongoDB collections appear as Tableau Tables. You can convert
         existing collections/tables to Custom SQL or create new Custom SQL queries
         to leverage {+asql+} syntax for transformations like flattening nested
         objects and unwinding arrays.
