.. procedure:: 
   :style: normal 

   .. step:: Define the query.

      a. Create a new file named ``sort-by-date.js`` 
         and paste the following code:
         
         .. literalinclude:: /includes/fts/sort/date-tutorial.js
            :language: javascript
            :linenos:
            :emphasize-lines: 5

      #. Specify the ``<connection-string>``.
          
   .. step:: Run the query.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash

            node sort-by-date.js

         .. output::
            :language: json
            :visible: false

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
