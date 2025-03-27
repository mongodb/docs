.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
   
   .. step:: Go to the :guilabel:`Search Tester`.
  
      Click the :guilabel:`Query` button to the right of the index to
      query. 

   .. step:: View and edit the query syntax.

      Click :guilabel:`Edit $search Query` to view a default query
      syntax sample in |json| format. 

   .. step:: Run an |fts| query against the indexed field.

      To run the query, copy and paste the following query into the the
      :guilabel:`Query Editor`, then click :guilabel:`Search`. 

      The following query searches for movies released :ref:`near
      <near-ref>` November 11, 1921. It specifies a ``pivot`` distance
      from ``origin`` of approximately three months. It requests
      metadata on the ``genres`` and ``year`` field. The query requests
      a count of the:  
  
      - Number of movies in each genre in the ``genres`` string array
        field  
      - Number of movies in the years 1910 to 1939, inclusive 

      .. literalinclude:: /includes/fts/facet/tutorial-atlas-ui.js
         :language: js
         :dedent: 

   .. step:: Expand your query results.

      The :guilabel:`Search Tester` might not display all the values for 
      the fields in the results. To view all the values for the fields
      in the results, expand the fields.

      |fts| displays the following results in the page:
        
      .. code-block:: js
         :copyable: false
        
         count: Object
           lowerBound: 20878
         facet: Object
           genresFacet: Object
             buckets: Array (10)
               0: Object
                  _id: "Drama"
                  count: 12149
               1: Object
                  _id: "Comedy"
                  count: 6436
               2: Object
                  _id: "Romance"
                  count: 3274
               3: Object
                  _id: "Crime"
                  count: 2429
               4: Object
                  _id: "Thriller"
                  count: 2400
               5: Object
                  _id: "Action"
                  count: 2349
               6: Object
                  _id: "Adventure"
                  count: 1876
               7: Object
                  _id: "Documentary"
                  count: 1755
               8: Object
                  _id: "Horror"
                  count: 1432
               9: Object
                  _id: "Biography"
                  count: 1244
           yearFacet: Object
             buckets: Array (3)
               0: Object
                  _id: 1910
                  count: 14
               1: Object
                  _id: 1920
                  count: 47
               2: Object
                  _id: 1930
                  count: 238
