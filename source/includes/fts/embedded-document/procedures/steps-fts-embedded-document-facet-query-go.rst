.. procedure:: 
   :style: normal

   .. step:: Create files named ``embedded-documents-facet-query``.

   .. step:: Copy and paste the example query into the ``embedded-documents-facet-query`` file.

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst

      .. literalinclude:: /includes/fts/embedded-document/facet-query.go 
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 14

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the following command to query your collection: 

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell

            go run embedded-documents-facet-query.go

         .. output:: /includes/fts/embedded-document/facet-go-query-results.sh 
            :language: json 
            :linenos:
            :visible: true

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
