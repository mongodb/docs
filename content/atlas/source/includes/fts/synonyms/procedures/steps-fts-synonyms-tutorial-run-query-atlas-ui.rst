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
      
   .. step:: Run the following example queries on the ``movies`` collection.

      If you created an index with a single synonym mapping definition, run 
      the query from the following Simple Example tab. If you defined 
      multiple synonym mappings in your index, you can run the queries from 
      both of the following tabs.
      
      The following queries:
        
      - Exclude all fields except the ``title`` field.
      - Add a field named ``score``.
      
      .. tabs:: 
      
         .. tab:: Simple Example 
            :tabid: simple
      
            |fts| query results vary based on the type of word mapping 
            defined in the synonyms source collection. 
      
            .. tabs:: 
      
               .. tab:: equivalent Mapping Type
                  :tabid: equivalent
      
                  The following query searches the ``title`` field for 
                  ``automobile`` and uses the ``transportSynonyms`` synonym 
                  mapping definition to search for the synonyms of 
                  ``automobile`` that you configured in the 
                  ``transport_synonyms`` synonyms source collection.
      
                  .. io-code-block::
                     :copyable: true
      
                     .. input::
                        :language: json
      
                        [
                          {
                            $search: {
                              index: "synonyms-tutorial",
                              text: {
                                path: "title",
                                query: "automobile",
                                synonyms: "transportSynonyms"
                              }
                            }
                          }
                        ]
      
                     .. output::
                        :visible: true
      
                        SCORE: 4.197734832763672  _id:  “573a13a9f29313caabd1f18a”
                          fullplot: "While traveling to California for the dispute of the final race of the…"
                          imdb: Object
                          year: 2006
                          ...
                          title: "Cars"
      
                        SCORE: 3.8511905670166016  _id:  “573a1398f29313caabcea94c”
                          plot: "A man must struggle to travel home for Thanksgiving with an obnoxious …"
                          genres: Array
                          runtime: 93
                          ...
                          title: "Planes, Trains, and Automobiles"
      
                        SCORE: 3.39473032951355  _id:  “573a1397f29313caabce5fb0”
                          plot: "Car Wash is about a close-knit group of employees who one day have all…"
                          genres: Array
                          runtime: 97
                          ...
                          title: "Car Wash"
      
                        SCORE: 3.39473032951355  _id:  “573a1397f29313caabce7bd2”
                          plot: "When the owner of a struggling used car lot is killed, it's up to the …"
                          genres: Array
                          runtime: 113
                          ...
                          title: "Used Cars"
      
                        SCORE: 3.39473032951355  _id:  “573a13a6f29313caabd18bfe”
                          fullplot: "Gifted 18-year-old Meg has been abandoned by her father and neglected …"
                          imdb: Object
                          year: 2002
                          ...
                          title: "Blue Car"
            
                        SCORE: 3.39473032951355  _id:  “573a13c1f29313caabd64e3d”
                          fullplot: "After Mater gets his best friend, star race car Lightning McQueen, a s…"
                          imdb: Object
                          year: 2011
                          ...
                          title: "Cars 2"
      
                        SCORE: 3.39473032951355  _id:  “573a13eaf29313caabdce62c”
                          plot: "A rebellious teenager navigates his way through the juvenile court sys…"
                          genres: Array
                          runtime: 94
                          ...
                          title: "Stealing Cars"
      
                        SCORE: 3.39473032951355  _id:  “573a13f1f29313caabddc93f”
                          plot: "A small town sheriff sets out to find the two kids who have taken his …"
                          genres: Array
                          runtime: 86
                          ...
                          title: "Cop Car"
      
                        SCORE: 2.8496146202087402  _id:  “573a1396f29313caabce5480”
                          plot: "The small town of Paris, Australia deliberately causes car accidents, …"
                          genres: Array
                          runtime: 91
                          ...
                          title: "The Cars That Eat People"
      
                        SCORE: 2.8496146202087402  _id:  “573a139df29313caabcf9636”
                          plot: "Military doctor General Klenski is arrested in Stalin's Russia in 1953…"
                          genres: Array
                          runtime: 137
                          ...
                          title: "Khrustalyov, My Car!"
      
                  .. include:: /includes/fts/extracts/fts-synonyms-tutorial-equivalent-query-output.rst
      
               .. tab:: explicit Mapping Type
                  :tabid: explicit
      
                  The query searches the ``title`` field for ``boat`` and 
                  uses the ``transportSynonyms`` synonym mapping definition 
                  to search for the synonyms of ``boat`` that you 
                  configured in the ``transport_synonyms`` synonyms source 
                  collection.
      
                  .. io-code-block::
                     :copyable: true
      
                     .. input::
                        :language: json
      
                        [
                          {
                            $search: {
                              index: "synonyms-tutorial",
                              text: {
                                path: "title",
                                query: "boat",
                                synonyms: "transportSynonyms"
                              }
                            }
                          }
                        ]
      
                     .. output::
                        :visible: true
      
                        SCORE: 5.373150825500488  _id:  “573a13e9f29313caabdcd013”
                          plot: "A fearless sea captain sails a ship through loopholes in international…"
                          genres: Array
                          runtime: 90
                          ...
                          title: "Vessel"
      
                        SCORE: 4.589139938354492  _id:  “573a13e8f29313caabdc9e72”
                          countries: Array
                          genres: Array
                          runtime: 7
                          ...
                          title: "Boats"
      
                        SCORE: 4.3452959060668945  _id:  “573a1398f29313caabce90b6”
                          plot: "In 1914, a luxury ship leaves Italy in order to scatter the ashes of a…"
                          genres: Array
                          runtime: 128
                          ...
                          title: "And the Ship Sails On"
      
                        SCORE: 4.3452959060668945  _id:  “573a139cf29313caabcf7c75”
                          plot: "A young Pennsylvania man moves to Los Angeles to begin work for an amb…"
                          genres: Array
                          runtime: 90
                          ...
                          title: "Broken Vessels"
      
                        SCORE: 4.3452959060668945  _id:   “573a13f0f29313caabdda2dd”
                          plot: "A young man struggling with the death of his parents meets an extrover…"
                          genres: Array
                          runtime: 80
                          ...
                          title: "Sailing to Paradise"
            
                        SCORE: 3.711261749267578  _id:  “573a1397f29313caabce8796”
                          plot: "A Japanese photojournalist revisits Vietnam after the Liberation and l…"
                          genres: Array
                          runtime: 109
                          ...
                          title: "Boat People"
      
                        SCORE: 3.711261749267578  _id:  “573a13a6f29313caabd17a98”
                          plot: "Two straight men mistakenly end up on a "gays only" cruise."
                          genres: Array
                          runtime: 94
                          ...
                          title: "Boat Trip"
      
                        SCORE: 3.1153182983398438  _id:  “573a1394f29313caabce036c”
                          plot: "Three London gentlemen take vacation rowing down the Thames, encounter…"
                          genres: Array
                          runtime: 84
                          ...
                          title: "Three Men in a Boat"
      
                        SCORE: 3.1153182983398438  _id:  “573a1395f29313caabce2c28”
                          plot: "After a series of misunderstandings, the head of an aerospace research…"
                          genres: Array
                          runtime: 110
                          ...
                          title: "The Glass Bottom Boat"
      
                        SCORE: 3.1153182983398438  _id:  “573a13c2f29313caabd68772”
                          fullplot: "Jack is a shy and awkward man who drives a limo and lives an unassumin…"
                          imdb: Object
                          runtime: 2010
                          ...
                          title: "Jack Goes Boating"
      
                  .. include:: /includes/fts/extracts/fts-synonyms-tutorial-explicit-query-output.rst
      
         .. tab:: Advanced Example 
            :tabid: advanced
      
            |fts| query results vary based on the type of word mapping 
            defined in the synonyms source collection. 
      
            .. tabs:: 
      
               .. tab:: equivalent Mapping Type
                  :tabid: equivalent
      
                  The query searches the ``title`` field for ``automobile`` 
                  and uses the ``transportSynonyms`` synonym mapping 
                  definition to search for the synonyms of 
                  ``automobile`` that you configured in the 
                  ``transport_synonyms`` synonyms source collection. Also, 
                  the query searches the ``title`` field for ``attire`` and 
                  uses the ``attireSynonyms`` synonym mapping definition to 
                  search for the synonyms of ``attire`` that you configured 
                  in the ``attire_synonyms`` synonyms source collection.
      
                  .. io-code-block::
                     :copyable: true
      
                     .. input::
                        :language: json
      
                        [
                          {
                            $search: {
                              "index": "synonyms-tutorial",
                              "compound": {
                                "should": [{
                                  "text": {
                                    "path": "title",
                                    "query": "automobile",
                                    "synonyms": "transportSynonyms"
                                  }
                                },
                                {
                                  "text": {
                                    "path": "title",
                                    "query": "attire",
                                    "synonyms": "attireSynonyms"
                                  }
                                }]
                              }
                            }
                          }
                        ]
      
                     .. output::
                        :visible: true
      
                        SCORE: 4.812004089355469  _id:  “573a139af29313caabcf003f”
                          plot: "The Dress is a tale filled with sex, violence, comedy and drama as it …"
                          genres: Array
                          runtime: 103
                          ...
                          title: "The Dress"
                        
                        SCORE: 4.197734832763672  _id:  “573a13a9f29313caabd1f18a”
                          fullplot: "While traveling to California for the dispute of the final race of the…"
                          imdb: Object
                          year: 2006
                          ...
                          title: "Cars"
      
                        SCORE: 3.891493320465088  _id:  “573a1397f29313caabce77cd”
                          plot: "A mysterious blonde woman kills one of a psychiatrist's patients, and …"
                          genres: Array
                          runtime: 105
                          ...
                          title: "Dressed to Kill"
      
                        SCORE: 3.891493320465088  _id:  “573a13bcf29313caabd57e07”
                          fullplot: "Two things about Jane: she never says no to her friends (she's been a …"
                          imdb Object
                          year: 2008
                          ...
                          title: "27 Dresses"
      
                        SCORE: 3.8511905670166016  _id:  “573a1398f29313caabcea94c”
                          plot: "A man must struggle to travel home for Thanksgiving with an obnoxious …"
                          genres: Array
                          runtime: 93
                          ...
                          title: "Planes, Trains, and Automobiles"
      
                        SCORE: 3.39473032951355  _id:  “573a1397f29313caabce5fb0”
                          plot: "Car Wash is about a close-knit group of employees who one day have all…"
                          genres: Array
                          runtime: 97
                          ...
                          title: "Car Wash"
      
                        SCORE: 3.39473032951355  _id:  “573a1397f29313caabce7bd2”
                          plot: "When the owner of a struggling used car lot is killed, it's up to the …"
                          genres: Array
                          runtime: 113
                          ...
                          title: "Used Cars"
      
                        SCORE: 3.39473032951355  _id:  “573a13a6f29313caabd18bfe”
                          fullplot: "Gifted 18-year-old Meg has been abandoned by her father and neglected …"
                          imdb: Object
                          year: 2002
                          ...
                          title: "Blue Car"
            
                        SCORE: 3.39473032951355  _id:  “573a13c1f29313caabd64e3d”
                          fullplot: "After Mater gets his best friend, star race car Lightning McQueen, a s…"
                          imdb: Object
                          year: 2011
                          ...
                          title: "Cars 2"
      
                        SCORE: 3.39473032951355  _id:  “573a13eaf29313caabdce62c”
                          plot: "A rebellious teenager navigates his way through the juvenile court sys…"
                          genres: Array
                          runtime: 94
                          ...
                          title: "Stealing Cars"
      
                  .. include:: /includes/fts/extracts/fts-synonyms-tutorial-equivalent-advanced-query-output.rst
      
               .. tab:: explicit Mapping Type
                  :tabid: explicit
      
                  The query searches the ``title`` field for ``boat`` and 
                  uses the ``transportSynonyms`` synonym mapping definition 
                  to search for the synonyms of ``boat`` that you 
                  configured in the ``transport_synonyms`` synonyms source 
                  collection. Also, the query searches the ``title`` field 
                  for ``hat`` and uses the ``attireSynonyms`` synonym 
                  mapping definition to search for the synonyms of ``hat`` 
                  that you configured in the ``attire_synonyms`` synonyms 
                  source collection.
      
                  .. io-code-block::
                     :copyable: true
      
                     .. input::
                        :language: json
      
                        [
                          {
                            $search: {
                              index: "synonyms-tutorial",
                              compound: {
                                should: [{
                                  text: {
                                    path: "title",
                                    query: "boat",
                                    synonyms: "transportSynonyms"
                                  }
                                },
                                {
                                  text: {
                                    path: "title",
                                    query: "hat",
                                    synonyms: "attireSynonyms"
                                  }
                                }]
                              }
                            }
                          }
                        ]
      
                     .. output::
                        :visible: true
      
                        SCORE: 5.673145294189453  _id:  “573a1397f29313caabce6bed”
                          plot: "Down-on-his-luck Hollywood producer Barry 'Dutch' Detweiler attempts t…"
                          genres: Array
                          runtime: 114
                          ...
                          title: "Fedora"
                        
                        SCORE: 5.373150825500488  _id:  “573a13e9f29313caabdcd013”
                          plot: "A fearless sea captain sails a ship through loopholes in international…"
                          genres: Array
                          runtime: 90
                          ...
                          title: "Vessel"
      
                        SCORE: 4.589139938354492  _id:  “573a13e8f29313caabdc9e72”
                          countries: Array
                          genres: Array
                          runtime: 7
                          ...
                          title: "Boats"
      
                        SCORE: 4.3452959060668945  _id:  “573a1398f29313caabce90b6”
                          plot: "In 1914, a luxury ship leaves Italy in order to scatter the ashes of a…"
                          genres: Array
                          runtime: 128
                          ...
                          title: "And the Ship Sails On"
      
                        SCORE: 4.3452959060668945  _id:  “573a139cf29313caabcf7c75”
                          plot: "A young Pennsylvania man moves to Los Angeles to begin work for an amb…"
                          genres: Array
                          runtime: 90
                          ...
                          title: "Broken Vessels"
      
                        SCORE: 4.3452959060668945  _id:   “573a13f0f29313caabdda2dd”
                          plot: "A young man struggling with the death of his parents meets an extrover…"
                          genres: Array
                          runtime: 80
                          ...
                          title: "Sailing to Paradise"
      
                        SCORE: 4.066137313842773  _id:  “573a1392f29313caabcdaae8”
                          plot: "An American dancer comes to Britain and falls for a model whom he init…"
                          genres: Array
                          runtime: 101
                          ...
                          title: "Top Hat"
            
                        SCORE: 4.066137313842773  _id:  “573a1394f29313caabce05e8”
                          plot: "A Korean War veteran's morphine addiction wreaks havoc upon his family…"
                          genres: Array
                          runtime: 109
                          ...
                          title: "A Hatful of Rain"
                        
                        SCORE: 3.711261749267578  _id:  “573a1397f29313caabce8796”
                          plot: "A Japanese photojournalist revisits Vietnam after the Liberation and l…"
                          genres: Array
                          runtime: 109
                          ...
                          title: "Boat People"
      
                        SCORE: 3.711261749267578  _id:  “573a13a6f29313caabd17a98”
                          plot: "Two straight men mistakenly end up on a "gays only" cruise."
                          genres: Array
                          runtime: 94
                          ...
                          title: "Boat Trip"
      
                  .. include:: /includes/fts/extracts/fts-synonyms-tutorial-explicit-advanced-query-output.rst
      
   .. step:: Expand your query results.
      
      .. include:: /includes/fts/facts/fact-fts-expand-search-tester-results.rst
