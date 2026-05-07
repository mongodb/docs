.. procedure::
   :style: normal

   .. step:: Create a new file named ``runQuery.java``. 
      
   .. step:: Copy and paste the sample code in the file.

      .. literalinclude:: /includes/quick-start/code-snippets/auto-embed/java/query.java
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

         .. output:: /includes/quick-start/code-snippets/auto-embed/java/auto-embed-java-sync-query-output.js
            :language: javascript
            :visible: false
            :linenos: