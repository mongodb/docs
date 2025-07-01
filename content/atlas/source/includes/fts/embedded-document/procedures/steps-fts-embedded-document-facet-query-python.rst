.. procedure:: 
   :style: normal

   .. step:: Create files named ``embedded-documents-facet-query.py``.

   .. step:: Copy and paste the code example into the ``embedded-documents-facet-query.py`` file.

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst

      .. literalinclude:: /includes/fts/embedded-document/facet-query.py 
         :language: python
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
                        
            python embedded-documents-facet-query.py

         .. output:: /includes/fts/embedded-document/facet-py-query-results.js
            :language: json 
            :linenos:
            :visible: true

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
