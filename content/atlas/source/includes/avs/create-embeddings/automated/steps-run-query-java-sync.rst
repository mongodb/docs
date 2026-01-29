.. procedure::
   :style: normal

   .. step:: Create a new file named ``runQuery.java``. 
      
   .. step:: Copy and paste the sample code in the file.

      .. literalinclude:: /includes/avs/create-embeddings/automated/query.java
         :language: java
         :linenos:
         :emphasize-lines: 22
         :caption: runQuery.java

   .. step:: Replace the ``<connectionString>``.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the following commands to query your collection.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            javac runQuery.java
            java runQuery

         .. output:: /includes/avs/create-embeddings/automated/java-sync-query-output.js
            :language: javascript
            :visible: false
            :linenos: