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
      
   .. step:: Run an |fts| query with the compound operator to search the ``users`` collection.

      The following query searches only for users that do not have a
      ``null`` value in the ``password`` field. The query specifies the
      following: 
      
      - Find all documents that don't have a ``null`` value in the 
        ``password`` field using the :ref:`wildcard-ref` operator.
        
      - Find documents that don't have the ``password`` field using the 
        :ref:`compound-ref` operator ``mustNot`` clause and replace their ``score`` 
        with ``2`` using the :ref:`scoring-constant` option.
      
        .. note:: 
      
           |fts| returns documents in order from highest score 
           to lowest. In this example, you alter the score for documents
           with a missing ``password`` field so that they return first.
           Otherwise, these documents have a score of ``0`` and return last.
           To learn more, see :ref:`Scoring <scoring-ref>`.
      
      .. io-code-block::
         :copyable: true
       
         .. input::
            :language: json
      
            [
              {
                $search: {
                  "index": "null-check-tutorial",
                  "compound": {
                    "should": [{
                      "wildcard": {
                        "path": "password",
                        "query": "*",
                        "allowAnalyzedField": true
                        }
                      },
                      {
                        "compound": {
                          "mustNot": {
                            "exists": {
                              "path": "password"
                            }
                          },
                          "score": { "constant": { "value": 2 } }
                        }
                      }
                    ]
                  }
                }
              }
            ]
      
         .. output::
            
            SCORE: 2  _id:  "64a6e2f2bceafd4df9153eaf”
              name: "Laura Garcia"
              email: "lgarcia@example.net"
      
            SCORE: 1  _id:  "59b99db4cfa9a34dcd7885b6”
              name: "Ned Stark"
              email: "sean_bean@gameofthron.es"
              password: "$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
      
            SCORE: 1  _id:  "59b99db4cfa9a34dcd7885b7”
              name: "Robert Baratheon"
              email: "mark_addy@gameofthron.es"
              password: "$2b$12$yGqxLG9LZpXA2xVDhuPnSOZd.VURVkz7wgOLY3pnO0s7u2S1ZO32y"
      
            SCORE: 1  _id:  "59b99db5cfa9a34dcd7885b8”
              name: "Jaime Lannister"
              email: "nikolaj_coster-waldau@gameofthron.es"
              password: "$2b$12$6vz7wiwO.EI5Rilvq1zUc./9480gb1uPtXcahDxIadgyC3PS8XCUK"
      
            SCORE: 1  _id:  "59b99db5cfa9a34dcd7885b9”
              name: "Catelyn Stark"
              email: "michelle_fairley@gameofthron.es"
              password: "$2b$12$fiaTH5Sh1zKNFX2i/FTEreWGjxoJxvmV7XL.qlfqCr8CwOxK.mZWS"
      
            SCORE: 1  _id:  "59b99db6cfa9a34dcd7885ba”
              name: "Cersei Lannister"
              email: "lena_headey@gameofthron.es"
              password: "$2b$12$FExjgr7CLhNCa.oUsB9seub8mqcHzkJCFZ8heMc8CeIKOZfeTKP8m"
      
            SCORE: 1  _id:  "59b99db6cfa9a34dcd7885bb”
              name: "Daenerys Targaryen"
              email: "emilia_clarke@gameofthron.es"
              password: "$2b$12$NzpbWHdMytemLtTfFKduHenr2NZ.rvxIKuYM4AWLTFaUShxbJ.G3q"
      
            SCORE: 1  _id:  "59b99db6cfa9a34dcd7885bc”
              name: "Jorah Mormont"
              email: "iain_glen@gameofthron.es"
              password: "$2b$12$K8bKkwnpkrjsBPzASZxO/.yj7d9kvupiVtO6JA3Xl106AKXr3pXFK"
      
            SCORE: 1  _id:  "59b99db7cfa9a34dcd7885bd”
              name: "Petyr Baelish"
              email: "aidan_gillen@gameofthron.es"
              password: "$2b$12$qM.YvmiekyYYY7p7phpK3OicbRCDkN7ESwYAnG/o9YnfHC0Mhkmbi"
      
            SCORE: 1  _id:  "59b99db8cfa9a34dcd7885be”
              name: "Viserys Targaryen"
              email: "harry_lloyd@gameofthron.es"
              password: "$2b$12$cpwVmU4DyuQxgwpdrVJhaudzbKOXlHRbf.tpCuHjpAqonuoyvvEG6"     
