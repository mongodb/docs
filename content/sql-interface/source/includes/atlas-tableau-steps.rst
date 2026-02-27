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