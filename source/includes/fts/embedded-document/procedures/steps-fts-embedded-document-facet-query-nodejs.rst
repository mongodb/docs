.. procedure:: 
   :style: normal

   .. step:: Create files named ``embedded-documents-facet-query.js``.

   .. step:: Copy and paste the code for the query into the ``embedded-documents-facet-query.js`` file.
 
      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst

      .. literalinclude:: /includes/fts/embedded-document/facet-query.js
         :language: javascript 
         :linenos:
         :dedent:
         :emphasize-lines: 4

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the following command to query your collection: 

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell
                        
            node embedded-documents-facet-query.js

         .. output:: /includes/fts/embedded-document/facet-nodejs-query-results.json 
            :language: json 
            :linenos:
            :visible: true

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
