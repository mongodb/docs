.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``case-insensitive-query.py``.

   .. step:: Copy and paste the query into the ``case-insensitive-query.py`` file.

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-desc.rst

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-stages.rst

      .. literalinclude:: /includes/fts/case-insensitive/query.py
         :language: go
         :linenos:
         :dedent:
         :emphasize-lines: 5, 21

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the command to query your collection.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell
           
            python case-insensitive-query.py

         .. output::
            :language: json
            :visible: true
            
            {'_id': ObjectId('573a139cf29313caabcf662c'), 'title': 'Atomic Train', 'awards': {'wins': 1, 'nominations': 1, 'text': '1 win & 1 nomination.'}, 'score': 3.317898988723755}
            {'_id': ObjectId('64de50ae2932de4dd3203061'), 'title': 'atomic train', 'awards': {'wins': 1, 'nominations': 1}, 'score': 3.317898988723755}
            {'_id': ObjectId('573a13bbf29313caabd52ff4'), 'title': 'How to Train Your Dragon', 'awards': {'wins': 32, 'nominations': 51, 'text': 'Nominated for 2 Oscars. Another 30 wins & 51 nominations.'}, 'score': 2.228306293487549}
            {'_id': ObjectId('64de50da2932de4dd3204393'), 'title': 'how to train your dragon', 'awards': {'wins': 32, 'nominations': 51}, 'score': 2.228306293487549}
            {'_id': ObjectId('573a13ccf29313caabd83281'), 'title': 'How to Train Your Dragon 2', 'awards': {'wins': 18, 'nominations': 52, 'text': 'Nominated for 1 Oscar. Another 17 wins & 52 nominations.'}, 'score': 2.008449077606201}

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-results.rst

      .. code-block:: shell
         :copyable: false 

         {'_id': ObjectId('573a139cf29313caabcf662c'), 'title': 'Atomic Train', 'awards': {'wins': 1, 'nominations': 1, 'text': '1 win & 1 nomination.'}, 'score': 3.3326687812805176}
         {'_id': ObjectId('573a13bbf29313caabd52ff4'), 'title': 'How to Train Your Dragon', 'awards': {'wins': 32, 'nominations': 51, 'text': 'Nominated for 2 Oscars. Another 30 wins & 51 nominations.'}, 'score': 2.2382168769836426}
         {'_id': ObjectId('573a13ccf29313caabd83281'), 'title': 'How to Train Your Dragon 2', 'awards': {'wins': 18, 'nominations': 52, 'text': 'Nominated for 1 Oscar. Another 17 wins & 52 nominations.'}, 'score': 2.0173802375793457}
         {'_id': ObjectId('573a13b1f29313caabd36490'), 'title': "Howard Zinn: You Can't Be Neutral on a Moving Train", 'awards': {'wins': 1, 'nominations': 0, 'text': '1 win.'}, 'score': 1.446497917175293}
         {'_id': ObjectId('573a13c8f29313caabd78a6b'), 'title': 'Last Train Home', 'awards': {'wins': 14, 'nominations': 9, 'text': '14 wins & 9 nominations.'}, 'score': 2.8655927181243896}

      .. include:: /includes/fts/extracts/fts-normalized-sort-query-run-query.rst 