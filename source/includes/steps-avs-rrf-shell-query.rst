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
             _id: 'Cowboys & Aliens',
             vs_score: 0.0012658227848101266,
             fts_score: 0,
             score: 0.0012658227848101266
           },
           {
             _id: 'Planet of the Apes',
             vs_score: 0.001298701298701299,
             fts_score: 0,
             score: 0.001298701298701299
           },
           {
             _id: 'Starcrash',
             vs_score: 0.0013157894736842105,
             fts_score: 0,
             score: 0.0013157894736842105
           },
           {
             _id: 'Zathura: A Space Adventure',
             vs_score: 0.0013333333333333335,
             fts_score: 0,
             score: 0.0013333333333333335
           },
           {
             _id: 'Space Raiders',
             vs_score: 0.0013513513513513514,
             fts_score: 0,
             score: 0.0013513513513513514
           },
           {
             _id: 'Star Wars: Episode III - Revenge of the Sith',
             vs_score: 0.0013698630136986301,
             fts_score: 0,
             score: 0.0013698630136986301
           },
           {
             _id: 'The Ewok Adventure',
             vs_score: 0.001388888888888889,
             fts_score: 0,
             score: 0.001388888888888889
           },
           {
             _id: 'Dune',
             vs_score: 0.0014084507042253522,
             fts_score: 0,
             score: 0.0014084507042253522
           },
           {
             _id: 'Abiogenesis',
             vs_score: 0.0014285714285714286,
             fts_score: 0,
             score: 0.0014285714285714286
           },
           {
             _id: 'Guardians of the Galaxy',
             vs_score: 0.0014705882352941176,
             fts_score: 0,
             score: 0.0014705882352941176
           }
         ]