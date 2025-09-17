.. procedure:: 
   :style: normal 

   .. step:: Connect to your deployment in Compass.

      Open Compass and connect to your replica set. For
      detailed instructions on connecting, see
      `Connect to a Deployment <https://docs.mongodb.com/compass/master/connect/>`_.  

   .. step:: Selectc the database and collection.

      To run this example, on the :guilabel:`Database` screen, click the
      |database|, then click the |collection|.  

   .. step:: Create the index.

      a. Click the :guilabel:`Indexes` tab, then select
         :guilabel:`Search Indexes`. 
      #. Click :guilabel:`Create Index` to open the index creation dialog box.
      #. Specify a name for the index and the search index
         definition. 

         .. list-table:: 
            :widths: 20 80

            * - Index Name 
              - |index-name|
 
            * - Index Definition 
              - .. code-block:: json 
                   :copyable: true 

                   {
                     mappings: { dynamic: true }
                   }

      #. Click :guilabel:`Create Search Index`.

   .. step:: Run a search query. 

      The following aggregation pipeline searches for the term ``baseball`` in
      the ``plot`` field of the ``movies`` collection. It includes a
      :pipeline:`$limit` stage to limit the output to 5 results and a
      :pipeline:`$project` stage to exclude all fields except ``title`` and
      ``plot``.

      To run this search query in Compass:

      a. Click the :guilabel:`Aggregations` tab.
      #. Click :guilabel:`Select...`, then configure each of the following 
         pipeline stages by selecting the stage from the dropdown and adding
         the query for that stage. Click :guilabel:`Add Stage` to add 
         additional stages.

         .. list-table::
            :header-rows: 1
            :widths: 25 75

            * - Pipeline Stage
              - Query

            * - ``$search``
              - .. code-block:: javascript

                    {
                        "text": { 
                           "query": "baseball", 
                           "path": "plot"
                        }
                    }

            * - ``$limit``
              - .. code-block:: javascript

                    5

            * - ``$project``
              - .. code-block:: javascript

                    {
                        "_id": 0,
                        "title": 1,
                        "plot": 1
                    }


      If you enable :guilabel:`Auto Preview`, Compass displays the 
      following documents next to the ``$project``
      pipeline stage:

      .. code-block:: json
         :copyable: false

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

