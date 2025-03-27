.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
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

   .. step:: Run the following |fts| queries against the ``schools`` collection.

      To learn more about these queries, see :ref:`embedded-documents-tutorial-queries`.

      .. tabs:: 

         .. tab:: Nested Array   
            :tabid: simple 

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. io-code-block:: 
               :copyable: true 

               .. input:: /includes/fts/embedded-document/simple-mongosh-query.json
                  :linenos:
                  :language: json

               .. output:: /includes/fts/embedded-document/simple-mongosh-query-results.sh
                  :linenos:
                  :language: sh
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-basic-query-results.rst

         .. tab:: Nested Array Within Object
            :tabid: complex

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. io-code-block:: 
               :copyable: true 

               .. input:: /includes/fts/embedded-document/complex-mongosh-query.json 
                  :linenos:
                  :language: json

               .. output:: /includes/fts/embedded-document/complex-mongosh-query-results.sh 
                  :linenos:
                  :language: sh
                  :emphasize-lines: 7-10, 28-31
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-complex-query-results.rst

         .. tab:: Nested Arrays Within Array  
            :tabid: advanced

            To learn more about this query, see :ref:`embedded-documents-tutorial-queries`.

            .. io-code-block:: 
               :copyable: true 

               .. input:: /includes/fts/embedded-document/advanced-mongosh-query.json
                  :linenos:
                  :language: json

               .. output:: /includes/fts/embedded-document/advanced-mongosh-query-results.json 
                  :linenos:
                  :language: json
                  :visible: true

            .. include:: /includes/fts/extracts/fts-embedded-document-advanced-query-results.rst
