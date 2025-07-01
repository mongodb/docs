.. procedure:: 
   :style: normal 

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your cluster.
      For detailed instructions on connecting, see
      :ref:`connect-mongo-shell`. 

   .. step:: Use the ``sample_mflix`` database.

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: js

            use sample_mflix

         .. output:: 
            :language: shell 

            switched to db sample_mflix

   .. step:: Run the following |fts| ``compound`` operator queries on the ``movies`` collection.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst 

            .. io-code-block:: 
               :copyable: true
                
               .. input:: /includes/fts/custom-score/bury-category-mongosh.json 
                  :language: json
                  :linenos:

               .. output:: /includes/fts/custom-score/bury-category-mongosh-results.sh
                  :language: shell 
                  :linenos: 
                  :visible: false

            .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst 

            .. io-code-block:: 
               :copyable: true
                
               .. input:: /includes/fts/custom-score/bury-documents-mongosh.json
                  :language: json
                  :linenos:

               .. output:: /includes/fts/custom-score/bury-documents-mongosh-results.sh
                  :language: shell 
                  :linenos: 
                  :visible: false

            .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 
