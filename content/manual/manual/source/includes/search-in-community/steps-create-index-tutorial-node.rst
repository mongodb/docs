.. procedure::
   :style: normal
   
   .. step:: Define your index in a new file. 

      This example uses a file named ``create-index.js`` with the following
      index definition:
      
      .. literalinclude:: /includes/search-in-community/create-index-tutorial.js
         :caption: create-index.js
         :language: javascript
         :copyable:
         :emphasize-lines: 5

   .. step:: Specify your ``<connection-string>``. 
      
      .. _step-specify-conn-string:

      Ensure that your index configuration file specifies your connection string.
      
      .. include:: /includes/search-in-community/steps-connection-string-drivers-hidden.rst

      To learn more, see :ref:`connect-via-driver` and :urioption:`directConnection`.

   .. step:: Create the index.

      Run your index configuration file to create the search index. 

      For example, the following command creates the index with the
      ``create-index.js`` file:

      .. io-code-block::
         :copyable: true

         .. input::
            :language: shell

            node create-index.js

         .. output::

            default

   .. step:: Define your query in a new file. 
      
      This example uses a file named ``simple-query.js`` with the following query:

      .. literalinclude:: /includes/search-in-community/simple-fts-query.js
         :language: javascript
         :linenos:
         :emphasize-lines: 25

      This query performs the following operations: 

      - Imports ``mongodb``, MongoDB's Node.js driver.
      - Creates an instance of the ``MongoClient`` class to establish a 
        connection to your cluster.
      - Searches for the term ``baseball`` in the ``plot`` field. It includes a
        :pipeline:`$limit` stage to limit the output to 5 results and a
        :pipeline:`$project` stage to exclude all fields except ``title`` and
        ``plot``.
      - Iterates over the cursor to print the documents that match the 
        query.

   .. step:: Specify your ``<connection-string>``.

      To use this example, replace ``<connection-string>`` with the connection 
      string :ref:`you created above <step-specify-conn-string>` and then save the file.

   .. step:: Run your query. 
      
      For example, the following command queries your collection with the ``simple-query.js`` file: 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            node simple-query.js

         .. output::
            :language: javascript
            :visible: true

            {
               plot: 'A trio of guys try and make up for missed opportunities in childhood by forming a three-player baseball team to compete against standard children baseball squads.',
               title: 'The Benchwarmers'
            }
            {
               plot: 'A young boy is bequeathed the ownership of a professional baseball team.',
               title: 'Little Big League'
            }
            {
               plot: 'A trained chimpanzee plays third base for a minor-league baseball team.',
               title: 'Ed'
            }
            {
               plot: 'The story of the life and career of the famed baseball player, Lou Gehrig.',
               title: 'The Pride of the Yankees'
            }
            {
               plot: 'Babe Ruth becomes a baseball legend but is unheroic to those who know him.',
               title: 'The Babe'
            }
