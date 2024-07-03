.. procedure:: 
   :style: normal

   .. step:: Connect to your {+cluster+} using {+mongosh+}. 

      Open {+mongosh+} in a terminal window and connect to your 
      {+cluster+}. For detailed instructions on connecting, see 
      :doc:`/mongo-shell-connection`.

   .. step:: Use the ``sample_mflix`` database. 

      Run the following command at {+mongosh+} prompt:

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: sh

            use sample_mflix 

         .. output:: 
            :language: sh
            :emphasize-lines: 1 

            switched to db sample_mflix

   .. step:: Run the following |fts| queries against the ``embedded_movies`` collection.

      .. io-code-block:: 
         :copyable: true 

         .. input:: /includes/avs-examples/rrf-tutorial/query.sh
            :language: js 
            :linenos:

         .. output:: /includes/avs-examples/rrf-tutorial/shell-query-output.js
            :language: js
            :visible: true

      If you sort the results in ascending order by replacing the value
      of ``score`` on line 103 with ``1``, {+avs+} returns the following
      results: 

      .. code-block:: js 
         :copyable: false 

         [
           {
             _id: '2 Days in New York',
             vs_score: 0,
             fts_score: 0.03333333333333333,
             score: 0.03333333333333333
           },
           {
             _id: 'An Englishman in New York',
             vs_score: 0,
             fts_score: 0.034482758620689655,
             score: 0.034482758620689655
           },
           {
             _id: 'New York, I Love You',
             vs_score: 0,
             fts_score: 0.03571428571428571,
             score: 0.03571428571428571
           },
           {
             _id: 'New York: A Documentary Film',
             vs_score: 0,
             fts_score: 0.037037037037037035,
             score: 0.037037037037037035
           },
           {
             _id: 'A Couch in New York',
             vs_score: 0,
             fts_score: 0.038461538461538464,
             score: 0.038461538461538464
           },
           {
             _id: 'Sherlock Holmes in New York',
             vs_score: 0,
             fts_score: 0.04,
             score: 0.04
           },
           {
             _id: 'A King in New York',
             vs_score: 0,
             fts_score: 0.041666666666666664,
             score: 0.041666666666666664
           },
           {
             _id: 'Live from New York!',
             vs_score: 0,
             fts_score: 0.043478260869565216,
             score: 0.043478260869565216
           },
           {
             _id: 'Sleepless in New York',
             vs_score: 0,
             fts_score: 0.045454545454545456,
             score: 0.045454545454545456
           },
           {
             _id: 'Gangs of New York',
             vs_score: 0,
             fts_score: 0.047619047619047616,
             score: 0.047619047619047616
           }
         ]
