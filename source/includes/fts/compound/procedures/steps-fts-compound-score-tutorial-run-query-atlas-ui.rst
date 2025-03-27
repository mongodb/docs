.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. include:: /includes/nav/steps-atlas-search.rst
      
   .. step:: Go to the :guilabel:`Search Tester`.
      
      Click the :guilabel:`Query` button to the right of the index to 
      query.
      
   .. step:: View and edit the query syntax.
      
      Click :guilabel:`Edit Query` to view a default query syntax 
      sample in |json| format.
      
   .. step:: Run the following |fts| queries with the ``compound`` operator on the ``movies`` collection.
      
      Copy and paste the following query into the :guilabel:`Query Editor`, 
      and then click the :guilabel:`Search` button in the 
      :guilabel:`Query Editor`.
      
      The following examples use the ``compound`` operator with subqueries 
      to search for movies between the years ``2013`` to ``2015`` with the 
      term ``snow`` in the ``title`` field. 
      
      .. tabs:: 
      
         .. tab:: Constant
            :tabid: constant 
      
            The following query:
            
            - Uses the following ``compound`` operator clauses: 
            
              .. include:: /includes/fts/extracts/fts-compound-constant-desc.rst
      
            - .. include:: /includes/fts/extracts/fts-compound-highlight-desc.rst
      
            .. io-code-block:: 
               :copyable: true
      
               .. input::
                  :language: json
      
                  [
                    {
                      $search: {
                        index: "compound-query-custom-score-tutorial",
                        compound: {
                          filter: [{
                            range: {
                              path: "year",
                              gte: 2013,
                              lte: 2015
                            }
                          }],
                          should: [{
                            text: {
                              query: "snow",
                              path: "title",
                              score: {constant: {value: 5}}
                            }
                          }]
                        },
                        highlight:{
                          path: "title"
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
            
                  SCORE: 5  _id:  "573a13d7f29313caabda38ad"
                    Snow in Paradise
                    Matching fields: title
      
                  SCORE: 5  _id:  "573a13e2f29313caabdbeded"
                    Dead Snow 2: red vs.
                    Matching fields: title
      
                  SCORE: 5  _id:  "573a13e6f29313caabdc66c4"
                    The Snow White Murder Case
                    Matching fields: title
      
                  SCORE: 5  _id:  "573a13edf29313caabdd37bd"
                    Snow on the Blades
                    Matching fields: title
      
                  SCORE: 0  _id:  "573a13acf29313caabd29366"
                    No highlights found.
                    Matching fields: unknown
            
                  SCORE: 0  _id:  "573a13adf29313caabd2b765"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 0  _id:  "573a13b0f29313caabd333e7"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 0  _id:  "573a13b0f29313caabd3486a"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 0  _id:  "573a13b1f29313caabd3719d"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 0  _id:  "573a13b2f29313caabd3abb9"
                    No highlights found.
                    Matching fields: unknown
      
            .. include:: /includes/fts/extracts/fts-compound-constant-score-desc.rst
      
         .. tab:: Boost Single
            :tabid: boostsingle
      
            The following query:
            
            - Uses the following ``compound`` operator clauses:
            
              .. include:: /includes/fts/extracts/fts-compound-boost-desc.rst
      
            - .. include:: /includes/fts/extracts/fts-compound-highlight-desc.rst
      
            .. io-code-block:: 
               :copyable: true
      
               .. input::
                  :language: json
      
                  [
                    {
                      $search: {
                        index: "compound-query-custom-score-tutorial",
                        compound: {
                          must: [{
                            range: {
                              path: "year",
                              gte: 2013,
                              lte: 2015
                            }
                          }],
                          should: [{
                            text: {
                              query: "snow",
                              path: "title",
                              score: {boost: {value: 2}}
                            }
                          }]
                        },
                        highlight:{
                          path: "title"
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
            
                  SCORE: 6.7722930908203125  _id:  "573a13d7f29313caabda38ad"
                    Snow in Paradise
                    Matching fields: title
      
                  SCORE: 6.063445568084717  _id:  "573a13edf29313caabdd37bd"
                    Snow on the Blades
                    Matching fields: title
      
                  SCORE: 5.509652137756348  _id:  "573a13e6f29313caabdc66c4"
                    The Snow White Murder Case
                    Matching fields: title
      
                  SCORE: 5.065053939819336  _id:  "573a13e2f29313caabdbeded"
                    Dead Snow 2: Red vs.
                    Matching fields: title
      
                  SCORE: 1  _id:  "573a13acf29313caabd29366"
                    No highlights found.
                    Matching fields: unknown
            
                  SCORE: 1  _id:  "573a13adf29313caabd2b765"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b0f29313caabd333e7"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b0f29313caabd3486a"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b1f29313caabd3719d"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b2f29313caabd3abb9"
                    No highlights found.
                    Matching fields: unknown
      
            .. include:: /includes/fts/extracts/fts-compound-boost-score-desc.rst
      
         .. tab:: Boost Multiple
            :tabid: boostmulti
      
            The following query:
            
            - Uses the following ``compound`` operator clauses with 
              the ``boost`` option to prioritize some fields more 
              than other fields: 
            
              .. include:: /includes/fts/extracts/fts-compound-boost-advanced-desc.rst
      
            .. io-code-block:: 
               :copyable: true
      
               .. input::
                  :language: json
      
                  [
                    {
                      $search: {
                        index: "compound-query-custom-score-tutorial",
                        compound: {
                          must: [{
                            text: {
                              query: "comedy",
                              path: "genres",
                              score: {boost: {value: 9}}
                            }
                          },
                          {
                            text: {
                              query: "snow",
                              path: "title",
                              score: {boost: {value: 5}}
                            }
                          }],
                          should: [{
                            range: {
                              path: "year",
                              gte: 2013,
                              lte: 2015,
                              score: {boost: {value: 3}}
                            }
                          }]
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
            
                  SCORE: 21.872983932495117  _id:  "573a13c2f29313caabd6874c"
                    plot: "A ski vacation turns horrific for a group of medical students, as they…"
                    genres: Array
                    runtime: 91
      
                  SCORE: 21.043487548828125  _id:  "573a139ff29313caabcffff8"
                    fullplot: "When an entire town in upstate New York is closed down by an unexpecte…"
                    imdb: Object
                    year: 2000
      
                  SCORE: 21.043487548828125  _id:  "573a13a6f29313caabd16b02"
                    plot: "When a Miami dentist inherits a team of sled dogs, he's got to learn t…"
                    genres: Array
                    runtime: 99
      
                  SCORE: 19.523927688598633  _id:  "573a13a1f29313caabd06765"
                    fullplot: "Our two young lovers meet on a series of snowy days in high school. Ye…"
                    imdb: Object
                    runtime: 1999
      
                  SCORE: 17.426334381103516  _id:  "573a13e2f29313caabdbeded"
                    plot: "Still on the run from a group of Nazi zombies, a man seeks the aid of …"
                    genres: Array
                    runtime: 100
            
                  SCORE: 16.367326736450195  _id:  "573a13c2f29313caabd6688e"
                    countries: Array
                    genres: Array
                    runtime: 108
      
                  SCORE: 15.537829399108887  _id:  "573a13b1f29313caabd36d7d"
                    plot: "A love-struck Italian poet is stuck in Iraq at the onset of an America…"
                    genres: Array
                    runtime: 110
      
                  SCORE: 14.4263334274292  _id:  "573a1395f29313caabce1925"
                    plot: "An ice-skating Snow White finds refuge from the Wicked Queen with the …"
                    genres: Array
                    runtime: 107
      
         .. tab:: Function Score
            :tabid: fuction-score 
      
            The following query:
                  
            - Uses the following ``compound`` operator clauses: 
            
              .. include:: /includes/fts/extracts/fts-compound-function-desc.rst
      
            - .. include:: /includes/fts/extracts/fts-compound-highlight-desc.rst
      
            .. io-code-block:: 
               :copyable: true
      
               .. input::
                  :language: json
      
                  [
                    {
                      $search: {
                        index: "compound-query-custom-score-tutorial",
                        compound: {
                          must: [{
                            range: {
                              path: "year",
                              gte: 2013,
                              lte: 2015,
                            }
                          }],
                          should: [{
                            text: {
                              query: "snow",
                              path: "title",
                              score: {
                                function: {
                                  add: [{
                                    path: {
                                      value: "imdb.rating",
                                      undefined: 2
                                    }
                                  },
                                  {
                                    score: "relevance"
                                  }]
                                }
                              }  
                            }
                          }]
                        },
                        highlight: {
                          path: "title"
                        }
                      }
                    }
                  ]
      
               .. output::
                  :visible: true
            
                  SCORE: 10.454826354980469  _id:  "573a13e6f29313caabdc66c4"
                    The Snow White Murder Case
                    Matching fields: title
      
                  SCORE: 10.3317232131958  _id:  "573a13edf29313caabdd37bd"
                    Snow on the Blades
                    Matching fields: title
      
                  SCORE: 10.032526969909668  _id:  "573a13e2f29313caabdbeded"
                    Dead Snow 2: Red vs.
                    Matching fields: title
      
                  SCORE: 8.386146545410156  _id:  "573a13d7f29313caabda38ad"
                    Snow in Paradise
                    Matching fields: title
      
                  SCORE: 1  _id:  "573a13acf29313caabd29366"
                    No highlights found.
                    Matching fields: unknown
            
                  SCORE: 1  _id:  "573a13adf29313caabd2b765"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b0f29313caabd333e7"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b0f29313caabd3486a"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b1f29313caabd3719d"
                    No highlights found.
                    Matching fields: unknown
      
                  SCORE: 1  _id:  "573a13b2f29313caabd3abb9"
                    No highlights found.
                    Matching fields: unknown
      
            .. include:: /includes/fts/extracts/fts-compound-function-score-desc.rst
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst  
