.. procedure::
   :style: normal

   .. step:: Connect to your cluster in {+mongosh+}.

      Open {+mongosh+} in a terminal window and connect to your deployment. For
      detailed instructions on connecting, see :ref:`gswa-connect`.
   
   .. step:: Connect to your database. 
      
      To use the ``sample_mflix`` database, run the following command in the {+mongosh+} prompt:

      .. code-block:: shell

         use sample_mflix
   
   .. step:: Create your index.
      
      Use :method:`db.collection.createSearchIndex()` to create a search index. 
      
      For example, the following operation creates a search index on the ``movies`` collection.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            db.movies.createSearchIndex(
               "default",
               { mappings: { dynamic: true } }
            )

         .. output::

            default

   .. step:: Run your query.

      Use :pipeline:`$search` to run a search query.

      The following example query searches for the word ``baseball`` in the
      ``plot`` field on the ``movies`` collection. It includes a
      :pipeline:`$limit`  stage to limit the output to 5 results and a
      :pipeline:`$project` stage to exclude all fields except ``title`` and
      ``plot``.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: javascript

            db.movies.aggregate([
               {
                  $search: {
                  "text": { 
                     "query": "baseball", 
                     "path": "plot"
                  }
                  }
               },
               {
                  $limit: 5
               },
               {
                  $project: {
                  "_id": 0,
                  "title": 1,
                  "plot": 1
                  }
               }
            ])

         .. output::
            :language: json
            :visible: true
               
            { 
               "plot" : "A trio of guys try and make up for missed 
               opportunities in childhood by forming a three-player 
               baseball team to compete against standard children 
               baseball squads.", 
               "title" : "The Benchwarmers" 
            }
            { 
               "plot" : "A young boy is bequeathed the ownership of a 
               professional baseball team.", 
               "title" : "Little Big League" 
            }
            { 
               "plot" : "A trained chimpanzee plays third base for a 
               minor-league baseball team.", 
               "title" : "Ed" 
            }
            { 
               "plot" : "The story of the life and career of the famed 
               baseball player, Lou Gehrig.", 
               "title" : "The Pride of the Yankees" 
            }
            { 
               "plot" : "Babe Ruth becomes a baseball legend but is 
               unheroic to those who know him.", 
               "title" : "The Babe" 
            }

      See :ref:`$search <query-syntax-ref>` for more information on this
      aggregation stage.