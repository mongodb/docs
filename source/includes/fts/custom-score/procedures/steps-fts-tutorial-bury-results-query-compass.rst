.. procedure:: 
   :style: normal 

   .. step:: Connect to your cluster in |compass|.
      
      Open |compass| and connect to your {+cluster+}. For 
      detailed instructions on connecting, see 
      :ref:`atlas-connect-via-compass`. 

   .. step:: Use the ``movies`` collection in the ``sample_mflix`` database.

      On the :guilabel:`Database` screen, click the ``sample_mflix``
      database, then click the ``movies`` collection. 

   .. step:: Run the following |fts| queries on the ``movies`` collection. 

      .. tabs::
         
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst

      To run this query, perform the following steps in |compass|:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the
         following pipeline stages by selecting the stage from the
         dropdown and adding the query for that stage. 

         .. tip:: 

            Click :guilabel:`Add Stage` to add additional stages.

         .. tabs::
            :hidden:
         
            .. tab:: Bury Documents in a Category 
               :tabid: bury-genre

               .. include:: /includes/fts/custom-score/list-table-bury-category-query.rst

               If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
               :guilabel:`Auto Preview`, |compass| displays the following 
               documents next to the ``$project`` pipeline stage:

               .. literalinclude:: /includes/fts/custom-score/bury-category-compass-results.sh
                  :language: shell 
                  :linenos: 
                  :copyable: false

               .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

            .. tab:: Bury Specified Documents 
               :tabid: bury-id

               .. include:: /includes/fts/custom-score/list-table-bury-documents-query.rst

               If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
               :guilabel:`Auto Preview`, |compass| displays the following 
               documents next to the ``$project`` pipeline stage:

               .. literalinclude:: /includes/fts/custom-score/bury-documents-compass-results.sh
                  :language: shell 
                  :linenos: 
                  :copyable: false

               .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 
