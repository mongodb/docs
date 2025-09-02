.. procedure:: 
   :style: normal


   .. step:: Set up the file to run an |fts| facet query.

      a. Create a file named ``facet-query.py``. 

         .. code-block:: shell

            touch facet-query.py

      #. Copy and paste the following code into the ``facet-query.py`` 
         file.

         The following code example:

         - Imports ``pymongo``, MongoDB's Python driver, and the ``dns``
           module, which is required to connect ``pymongo`` to ``Atlas`` 
           using a |dns| seed list connection string. 

         - Creates an instance of the ``MongoClient`` class to establish a 
           connection to your |service| cluster.

         - Uses the following to query the collection: 

           .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

         - Iterates over the cursor to print the documents that match the 
           query.

         You can run this query using :pipeline:`$searchMeta` or using
         :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 

         .. tabs:: 

            .. tab:: $searchMeta 
               :tabid: search-meta-pipeline

               .. literalinclude:: /includes/fts/facet/tutorial.py
                  :language: python
                  :linenos:
                  :dedent:
                  :emphasize-lines: 5

            .. tab:: $search with $$SEARCH_META
               :tabid: search-meta-variable

               .. literalinclude:: /includes/fts/facet/tutorial-variable.py
                  :language: python
                  :linenos:
                  :dedent:
                  :emphasize-lines: 5

      #. .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run the |fts| facet query that groups the genre and year fields into buckets.
  
      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell
           
            python facet-query.py

         .. output::
            :language: python
            :visible: true
           
            {
              'meta': {
                'count': {'lowerBound': 20878}, 
                  'facet': {
                    'genresFacet': {
                      'buckets': [
                        {'_id': 'Drama', 'count': 12149}, 
                        {'_id': 'Comedy', 'count': 6436}, 
                        {'_id': 'Romance', 'count': 3274}, 
                        {'_id': 'Crime', 'count': 2429}, 
                        {'_id': 'Thriller', 'count': 2400}, 
                        {'_id': 'Action', 'count': 2349}, 
                        {'_id': 'Adventure', 'count': 1876}, 
                        {'_id': 'Documentary', 'count': 1755}, 
                        {'_id': 'Horror', 'count': 1432}, 
                        {'_id': 'Biography', 'count': 1244}
                      ]
                    }, 
                    'yearFacet': {
                      'buckets': [
                        {'_id': 1910, 'count': 14}, 
                        {'_id': 1920, 'count': 47}, 
                        {'_id': 1930, 'count': 238}
                      ]
                    }
                  }
                }
              }
            }
