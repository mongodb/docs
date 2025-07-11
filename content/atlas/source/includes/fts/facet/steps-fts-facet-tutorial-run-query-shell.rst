.. procedure:: 
   :style: normal 

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your cluster.
      For detailed instructions on connecting, see
      :doc:`/mongo-shell-connection`.
      
   .. step:: Switch to the ``sample_mflix`` database.

      Run the following command at {+mongosh+} prompt:

      .. code-block:: javascript

         use sample_mflix

   .. step:: Run an |fts| facet query that groups the genre and year fields into buckets."

      The sample query uses the following to query the collection:

      .. include:: /includes/fts/extracts/fts-facet-constant-desc.rst 

      You can run this query using :pipeline:`$searchMeta` or using
      :pipeline:`$search` with the ``SEARCH_META`` aggregation variable. 

      .. tabs:: 

         .. tab:: $searchMeta 
            :tabid: search-meta-pipeline
    
            .. io-code-block:: 
                :copyable: true 

                .. input:: /includes/fts/facet/tutorial-shell.js
                   :language: js
                   :linenos:
                   :dedent:

                .. output::
                   :language: json
                   :visible: true
                
                   [
                    {
                      meta: {
                        count: { lowerBound: Long('20878') },
                        facet: {
                        genresFacet: {
                            buckets: [
                            { _id: 'Drama', count: Long('12149') },
                            { _id: 'Comedy', count: Long('6436') },
                            { _id: 'Romance', count: Long('3274') },
                            { _id: 'Crime', count: Long('2429') },
                            { _id: 'Thriller', count: Long('2400') },
                            { _id: 'Action', count: Long('2349') },
                            { _id: 'Adventure', count: Long('1876') },
                            { _id: 'Documentary', count: Long('1755') },
                            { _id: 'Horror', count: Long('1432') },
                            { _id: 'Biography', count: Long('1244') }
                            ]
                        },
                        yearFacet: {
                            buckets: [
                            { _id: 1910, count: Long('14') },
                            { _id: 1920, count: Long('47') },
                            { _id: 1930, count: Long('238') }
                            ]
                        }
                        }
                      }
                    }
                   ]

         .. tab:: $search with SEARCH_META
            :tabid: search-meta-variable 

            .. io-code-block:: 
                :copyable: true 

                .. input:: /includes/fts/facet/tutorial-variable-shell.js
                   :language: js
                   :dedent:

                .. output::
                   :language: json
                   :visible: true
                
                   [
                    {
                      meta: {
                        count: { lowerBound: Long('20878') },
                        facet: {
                          genresFacet: {
                            buckets: [
                            { _id: 'Drama', count: Long('12149') },
                            { _id: 'Comedy', count: Long('6436') },
                            { _id: 'Romance', count: Long('3274') },
                            { _id: 'Crime', count: Long('2429') },
                            { _id: 'Thriller', count: Long('2400') },
                            { _id: 'Action', count: Long('2349') },
                            { _id: 'Adventure', count: Long('1876') },
                            { _id: 'Documentary', count: Long('1755') },
                            { _id: 'Horror', count: Long('1432') }, 
                            { _id: 'Biography', count: Long('1244') }
                            ]
                        },
                        yearFacet: {
                            buckets: [
                            { _id: 1910, count: Long('14') },
                            { _id: 1920, count: Long('47') },
                            { _id: 1930, count: Long('238') }
                            ]
                          }
                        }
                      }
                    }
                   ]

...