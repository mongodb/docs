.. procedure:: 
   :style: normal 

   .. step:: Connect to your cluster in |compass|.

      Open |compass| and connect to your {+cluster+}. For detailed
      instructions on connecting, see :ref:`atlas-connect-via-compass`.

   .. step:: Use the ``movies`` collection in the ``sample_mflix`` database.

      On the :guilabel:`Database` screen, click the ``sample_mflix``
      database, then click the ``movies`` collection. 

   .. step:: Run a |fts| facet query that groups the genre and year fields into buckets.
    
      The query uses the following ``searchMeta`` operator clauses:
  
      .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

      To run this query in |compass|:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the following 
         pipeline stages by selecting the stage from the dropdown and adding
         the query for that stage. Click :guilabel:`Add Stage` to add 
         additional stages.

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 

         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline

               .. include:: /includes/fts/facet/tutorial.rst

            .. tab:: $search with $$SEARCH_META 
               :tabid: search-meta-variable 

               .. include:: /includes/fts/facet/tutorial-variable.rst

         If you enabled :guilabel:`Auto Preview`, |compass| displays the 
         following documents next to the ``$set`` pipeline stage:

         .. code-block:: javascript
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