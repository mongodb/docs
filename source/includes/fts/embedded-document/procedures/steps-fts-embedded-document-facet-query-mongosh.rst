.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :doc:`/mongo-shell-connection`.

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

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/fts/embedded-document/facet-mongosh-query.js
            :linenos:
            :language: json

         .. output:: /includes/fts/embedded-document/facet-mongosh-query-results.js
            :linenos:
            :language: sh
            :visible: true

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
