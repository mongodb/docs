.. procedure:: 
   :style: normal 

   .. step:: Ensure that you add the following dependency to your project.

      .. list-table::
         :widths: 30 70 

         * - ``mongodb-driver-kotlin-coroutine``
           - 4.10.0 or higher version

   .. step:: Set up the file to run a |fts| facet query.

      a. Create a file named ``FacetQuery.kt``.
      #. Copy and paste the following code into the ``FacetQuery.kt`` file.

         The code example performs the following tasks:

         - Imports ``mongodb`` packages and dependencies.
         - Establishes a connection to your cluster.
         - Uses the following to query the collection:

           .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         - Prints the documents that match the query from the ``AggregateFlow`` instance.

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 

         .. tabs:: 
 
            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline

               .. literalinclude:: /includes/fts/facet/tutorial.kt
                  :language: kotlin
                  :linenos:
                  :dedent:
                  :emphasize-lines: 9

            .. tab:: $search with $$SEARCH_META
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/tutorial-variable.kt
                  :language: kotlin
                  :linenos:
                  :dedent:
                  :emphasize-lines: 10

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the ``FacetQuery.kt`` file.
     
      When you run the ``FacetQuery.kt`` program in your IDE, it prints
      a result similar to the following:
     
      .. code-block:: none
         :copyable: false
        
         {"meta": {
            "count": {"lowerBound": 20878}, 
            "facet": {
              "genresFacet": {
                "buckets": [
                  {"_id": "Drama", "count": 12149}, 
                  {"_id": "Comedy", "count": 6436}, 
                  {"_id": "Romance", "count": 3274}, 
                  {"_id": "Crime", "count": 2429}, 
                  {"_id": "Thriller", "count": 2400}, 
                  {"_id": "Action", "count": 2349}, 
                  {"_id": "Adventure", "count": 1876}, 
                  {"_id": "Documentary", "count": 1755}, 
                  {"_id": "Horror", "count": 1432}, 
                  {"_id": "Biography", "count": 1244}
                ]
              }, 
              "yearFacet": {
                "buckets": [
                  {"_id": 1910, "count": 14}, 
                  {"_id": 1920, "count": 47}, 
                  {"_id": 1930, "count": 238}
                ]
              }
            }
          }}
          }
         }
