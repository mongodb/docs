.. procedure:: 
   :style: normal

   .. step:: Set up the file to run a |fts| facet query.
  
      a. Create a file named ``FacetQuery.java``.
      #. Copy and paste the following code into the ``FacetQuery.java`` file.

         The code example performs the following tasks:

         - Imports ``mongodb`` packages and dependencies.
         - Establishes a connection to your cluster.
         - Uses the following searchMeta clauses to query the collection: 

           .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         - Iterates over the cursor to print the documents that match the query.

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 

         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline

               .. literalinclude:: /includes/fts/facet/tutorial.java
                  :language: java
                  :linenos:
                  :dedent:
                  :emphasize-lines: 14

            .. tab:: $search with $$SEARCH_META
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/tutorial-variable.java
                  :language: java
                  :linenos:
                  :dedent:
                  :emphasize-lines: 13

         .. note:: 

            To run the sample code in your Maven environment, add the 
            following above the import statements in your file.

            .. code-block:: 

               package com.mongodb.drivers;

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run the ``FacetQuery.java`` file.

     .. io-code-block::
        :copyable: true

        .. input::
           :language: bash

           javac FacetQuery.java
           java FacetQuery
        
        .. output::
           :language: json
           :visible: true
           
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