Run ``$searchMeta`` Query Against Embedded Document Fields
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

.. include:: /includes/embedded-documents-tutorial/facts/search-meta-query-intro.rst

.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      cluster. For detailed instructions on connecting, see 
      :ref:`connect-mongo-shell`.

   .. step:: Use the ``local_school`` database. 

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use local_school_district 

         .. output:: 
            :language: sh
            :emphasize-lines: 1 

            switched to db local_school_district

   .. step:: Run the following |fts| query against the ``schools`` collection.

      .. include:: /includes/embedded-documents-tutorial/facts/fts-embedded-document-facet-query-intro.rst

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/embedded-documents-tutorial/code-snippets/json/facet-mongosh-query.js
            :linenos:
            :language: json

         .. output:: /includes/embedded-documents-tutorial/code-snippets/json/facet-mongosh-query-results.js
            :linenos:
            :language: sh
            :visible: true

      .. include:: /includes/embedded-documents-tutorial/facts/fts-embedded-document-facet-query-results.rst
