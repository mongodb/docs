.. procedure::
   :style: normal

   .. step:: Create a new file named ``run-query.js``. 
      
   .. step:: Copy and paste the sample code in the file.

      .. literalinclude:: /includes/avs/create-embeddings/automated/query.js
         :language: javascript
         :linenos:
         :emphasize-lines: 5
         :caption: run-query.js

   .. step:: Replace the ``<connection-string>``.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`.

   .. step:: Run the following command to query your collection.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            node run-query.js

         .. output:: /includes/avs/create-embeddings/automated/nodejs-query-output.js
            :language: javascript
            :visible: false
            :linenos: