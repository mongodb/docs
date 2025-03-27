.. procedure:: 
   :style: normal

   .. step:: Connect to your cluster in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed 
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``movies`` collection in the ``sample_mflix`` database.

      On the :guilabel:`Database` screen, click the ``sample_mflix`` database, then click the ``movies`` collection.

   .. step:: Run the following |fts| queries using the same index definition.

      .. tabs::

         .. tab:: Paginate Results
            :tabid: pagination

            .. include:: /includes/fts/extracts/fts-paginate-results-basic-query-desc.rst

            .. include:: /includes/fts/divide-results/list-table-compass-simple-query.rst

            If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
            :guilabel:`Auto Preview`, |compass| displays the following
            documents next to the ``$project`` pipeline stage: 

            .. code-block:: json
               :copyable: false 

               title: 'Toy Story',
               cast: Array (4)

               title: 'Toy Story 2',
               cast: Array (4)

               cast: Array (4)
               title: 'From the Earth to the Moon'

               title: "You've Got Mail",
               cast: Array (4)

               cast: Array (4)
               title: 'Shooting War'

               title: 'Catch Me If You Can',
               cast: Array (4)

               title: 'The Polar Express',
               cast: Array (4)

               cast: Array (4)
               title: 'The Da Vinci Code'

               cast: Array (4)
               title: 'Toy Story 3'

               cast: Array (4)
               title: 'Extremely Loud & Incredibly Close'
            
         .. tab:: Return Total and Paginate Results
            :tabid: return-total

            .. include:: /includes/fts/extracts/fts-paginate-results-facet-query-desc.rst

            .. include:: /includes/fts/divide-results/list-table-compass-facet-query.rst

            If you :compass:`enabled </aggregation-pipeline-builder/#set-the-documents-limit-or-auto-preview-documents>` 
            :guilabel:`Auto Preview`, |compass| displays the following
            documents next to the ``$project`` pipeline stage: 

            .. code-block:: shell
               :copyable: false

               rows: Array (10)
                 0: Object
                   title: 'Toy Story'
                   cast: Array (4)
                   score: 4.617640972137451
                 1: Object
                   title: 'Toy Story 2'
                   cast: Array (4)
                   score: 4.617640972137451
                 2: Object
                   cast: Array (4)
                   title: 'From the Earth to the Moon',
                   score: 4.617640972137451
                 3: Object
                   title: "You've Got Mail"
                   cast: Array (4)
                   score: 4.617640972137451
                 4: Object
                   cast: Array (4)
                   title: 'Shooting War'
                   score: 4.617640972137451
                 5: Object
                   title: 'Catch Me If You Can',
                   cast: Array (4)
                   score: 4.617640972137451
                 6: Object
                   title: 'The Polar Express',
                   cast: Array (4)
                   score: 4.617640972137451
                 7: Object
                   cast: [ 'Tom Hanks', 'Audrey Tautou', 'Ian McKellen', 'Jean Reno' ],
                   title: 'The Da Vinci Code',
                   score: 4.617640972137451
                 8: Object
                   cast: [ 'Tom Hanks', 'Tim Allen', 'Joan Cusack', 'Ned Beatty' ],
                   title: 'Toy Story 3',
                   score: 4.617640972137451
                 9: Object
                   cast: Array (4)
                   title: 'Extremely Loud & Incredibly Close',
                   score: 4.617640972137451
                    
                 totalRows: Object 
                   count: Object 
                     lowerBound: 435

   .. step:: Expand your query results.

      |compass| might not display all the fields inside objects and all
      the values inside arrays for the documents it returns in the
      results. To view all the fields and values, expand the field in
      the results.  
