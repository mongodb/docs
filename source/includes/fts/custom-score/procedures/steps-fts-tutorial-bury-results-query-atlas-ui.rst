.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-search-tester.rst 

   .. step:: Run an |fts| query with the ``compound`` operator on the ``movies`` collection. 

      a. Copy and paste the following query into the :guilabel:`Query
         Editor`. 

         .. tabs:: 
            
            .. tab:: Bury Documents in a Category 
               :tabid: bury-genre

               The query uses the :pipeline:`$search` ``compound``
               operator ``should`` clause to nest ``compound`` operator
               queries that perform the following actions:  

               - Searches for movies that contain the term ``ghost`` in the
                 plot or title (``must`` clause) and aren't in the ``comedy``
                 genre (``mustNot`` clause). 
               - Searches for movies that contain the term ``ghost`` in the
                 plot or title (``must`` clause), but reduces (``boost``) the
                 score by 50% (``0.5``) for movies in the ``comedy`` genre with
                 the term ``ghost`` in the title or plot.   

               .. literalinclude:: /includes/fts/custom-score/bury-category-ui.json
                  :language: json
                  :copyable: true 
                  :linenos:

            .. tab:: Bury Specified Documents 
               :tabid: bury-id

               The query uses the :pipeline:`$search` ``compound``
               operator ``should`` clause to nest ``compound`` operator
               queries that perform the following actions:  

               - Searches for movies that contain the term ``ghost`` in
                 the plot or title (``must`` clause), but doesn't have
                 the specified ObjectIds (``mustNot`` clause). 
               - Searches for movies that contain the term ``ghost`` in
                 the plot or title (``must`` clause), but reduces
                 (``boost``) the score by 50% (``0.5``) for movies with
                 the specified ObjectIds (``filter`` clause). 

               .. literalinclude:: /includes/fts/custom-score/bury-documents-ui.json 
                  :language: json
                  :copyable: true 
                  :linenos:
         
      #. Click the :guilabel:`Search` button in the :guilabel:`Query Editor`. 

         .. tabs:: 
            :hidden:
            
            .. tab:: Bury by Genre 
               :tabid: bury-genre

               .. literalinclude:: /includes/fts/custom-score/bury-category-ui-results.sh 
                  :language: shell
                  :copyable: true 
                  :linenos:

               .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst

            .. tab:: Bury by ID 
               :tabid: bury-id

               .. literalinclude:: /includes/fts/custom-score/bury-documents-ui-results.sh 
                  :language: shell
                  :copyable: true 
                  :linenos:

               .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst
