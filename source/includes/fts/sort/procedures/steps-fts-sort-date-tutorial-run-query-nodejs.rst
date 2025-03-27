.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``sort-by-date.js``. 

   .. step:: Copy and paste the following code into the ``sort-by-date.js`` file.

      The code example performs the following tasks:

      - Imports ``mongodb``, MongoDB's Node.js driver.
      - Creates an instance of the ``MongoClient`` class to establish a 
        connection to your |service| cluster.

      - .. include:: /includes/fts/extracts/fts-sort-by-date-constant-desc.rst 

        .. include:: /includes/fts/extracts/fts-sort-by-date-stage.rst

      - Iterates over the cursor to print the documents that match the 
        query.

      .. literalinclude:: /includes/fts/sort/date-tutorial.js
         :language: javascript
         :linenos:
         :dedent:
         :emphasize-lines: 5

      .. note:: 
        
        .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst
          
   .. step:: Run the following command to query your collection: 

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            node sort-by-date.js

         .. output::
            :language: javascript
            :visible: true

            {
              title: 'Summer Nights',
              released: 2015-01-28T00:00:00.000Z,
              score: 0.348105788230896
            }
            {
              title: 'Summertime',
              released: 2014-08-01T00:00:00.000Z,
              score: 0.5917375683784485
            }
            {
              title: 'Summer of Blood',
              released: 2014-04-17T00:00:00.000Z,
              score: 0.9934720396995544
            }
            {
              title: 'Summer Games',
              released: 2012-02-08T00:00:00.000Z,
              score: 0.15982933342456818
            }
            {
              title: 'Summer of Goliath',
              released: 2011-07-08T00:00:00.000Z,
              score: 0.13038821518421173
            }
