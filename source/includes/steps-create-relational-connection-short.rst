.. short version of the steps under source/database-connections/save-relational-connection.txt, used within other procedures like migration job creation.

a. In the :guilabel:`Database type` drop-down, select the database type.

#. To enter a :ref:`connection string <rm-relational-database-connection-strings>` directly, enable the :guilabel:`Enter URI manually` toggle and paste your connection string into the :guilabel:`JDBC URI`.

#. To create a connection string by entering database information, enter the following:

   .. tabs::

      .. tab:: Oracle
         :tabid: db-oracle

         .. include:: /includes/table-oracle-connection-fields.rst

      .. tab:: SQL Server
         :tabid: db-sql

         .. include:: /includes/table-sql-connection-fields.rst

      .. tab:: MySQL
         :tabid: db-mysql

         .. include:: /includes/table-mysql-connection-fields.rst
         
      .. tab:: PostgreSQL
         :tabid: db-postgresql

         .. include:: /includes/table-postgresql-connection-fields.rst

      .. tab:: DB2
         :tabid: db-db2

         .. include:: /includes/table-db2-connection-fields.rst

      .. tab:: Sybase ASE
         :tabid: db-sybase

         .. include:: /includes/table-sybase-connection-fields.rst

#. Enter a :guilabel:`Connection name` and optional :guilabel:`Environment tag`.

#. Click :guilabel:`Connect`.
      
   The saved connection is available for use in all jobs and projects.