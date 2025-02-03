.. short version of the steps under source/database-connections/save-mongodb-connection.txt, used within other procedures like migration job creation.

a. Enter the MongoDB connection string.

   a. In :guilabel:`MongoDB connection string (URI)`, enter
      your :manual:`MongoDB URI </reference/connection-string>`.

   #. If it isn't included in the connection string, enter the
      :guilabel:`Database` to connect to.
   
   #. If they aren't included in the connection string, enter the 
      :guilabel:`Username` and :guilabel:`Password` of your
      :ref:`Relational Migrator MongoDB user <rm-mongodb-service-user>`.

#. Enter a :guilabel:`Connection name` and optional :guilabel:`Environment tag`.

#. Click :guilabel:`Connect`.
      
   The saved connection is available for use in all jobs and projects.