Run ``$searchMeta`` Query Against Embedded Document Fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/embedded-documents-tutorial/facts/search-meta-query-intro.rst

.. procedure:: 
   :style: normal

   .. step:: Create files named ``embedded-documents-facet-query.py``.

   .. step:: Copy and paste the code example into the ``embedded-documents-facet-query.py`` file.

      .. include:: /includes/embedded-documents-tutorial/facts/fts-embedded-document-facet-query-intro.rst

      .. literalinclude:: /includes/embedded-documents-tutorial/code-snippets/python/facet-query.py 
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

         .. output:: /includes/embedded-documents-tutorial/code-snippets/json/facet-py-query-results.js
            :language: json 
            :linenos:
            :visible: true

      .. include:: /includes/embedded-documents-tutorial/facts/fts-embedded-document-facet-query-results.rst
