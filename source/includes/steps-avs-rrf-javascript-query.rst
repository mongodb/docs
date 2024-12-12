.. procedure:: 
   :style: normal

   .. step:: Define the combined query pipeline. 

      Create a file called ``combined-query.js``, and paste the following
      code into it:

      .. literalinclude:: /includes/avs-examples/rrf-tutorial/combined-query.js
         :language: javascript
         :linenos:

   .. step:: Execute the code to run the queries against the ``embedded_movies`` collection.

      .. io-code-block:: 
         :copyable: true 

         .. input::
            :language: shell

            node --env-file=.env combined-query.js

         .. output:: /includes/avs-examples/rrf-tutorial/shell-query-output.js
            :language: js
            :visible: true

      If you sort the results in ascending order by replacing the value
      of ``score`` on line 123 with ``1``, {+avs+} returns the following
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
           },
           {
             _id: 'Message from Space',
             vs_score: 0.0015384615384615387,
             fts_score: 0,
             score: 0.0015384615384615387
           }
         ]