.. procedure::
   :style: normal

   .. step:: Run a basic query.
      
      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst

      a. Create a new file named ``run_query.py`` and paste the following code.

         .. include:: /includes/fts/extracts/fts-basic-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/simple-fts-query.py
            :language: python
            :linenos:
            :emphasize-lines: 3

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               python run_query.py

            .. output::
               :language: shell
               :visible: false

               {'plot': 'A trio of guys try and make up for missed opportunities in childhood by forming a three-player baseball team to compete against standard children baseball squads.', 'title': 'The Benchwarmers'}
               {'plot': 'A young boy is bequeathed the ownership of a professional baseball team.', 'title': 'Little Big League'}
               {'plot': 'A trained chimpanzee plays third base for a minor-league baseball team.', 'title': 'Ed'}
 
   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst

      a. Modify ``run_query.py`` to use the compound query.

         .. include:: /includes/fts/extracts/fts-compound-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/complex-fts-query.py
            :language: python
            :linenos:
            :emphasize-lines: 5-8, 15-26, 35

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               python run_query.py

            .. output::
               :language: shell
               :visible: false

               {'plot': 'The story of the life and career of the famed baseball player, Lou Gehrig.', 'genres': ['Biography', 'Drama', 'Family'], 'title': 'The Pride of the Yankees'}
               {'plot': 'Babe Ruth becomes a baseball legend but is unheroic to those who know him.', 'genres': ['Biography', 'Drama', 'Sport'], 'title': 'The Babe'}
               {'plot': 'Dominican baseball star Miguel "Sugar" Santos is recruited to play in the U.S. minor-leagues.', 'genres': ['Drama', 'Sport'], 'title': 'Sugar'}

   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst

      a. Modify ``run_query.py`` to add the :ref:`sort <sort-ref>` option.

         .. include:: /includes/fts/extracts/fts-process-results-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/sort-query.py
            :language: python
            :linenos:
            :emphasize-lines: 24-27, 39

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash
         
               python run_query.py

            .. output::
               :language: shell
               :visible: false
         
               {'plot': 'A sports agent stages an unconventional recruitment strategy to get talented Indian cricket players to play Major League Baseball.', 'genres': ['Biography', 'Drama', 'Sport'], 'title': 'Million Dollar Arm', 'released': datetime.datetime(2014, 5, 16, 0, 0)}
               {'plot': 'A Taiwanese high school baseball team travels to Japan in 1931 to compete in a national tournament.', 'genres': ['Biography', 'Drama', 'History'], 'title': 'Kano', 'released': datetime.datetime(2014, 2, 27, 0, 0)}
               {'plot': "12-year-old Josh is a mixed race boy and a promising baseball player...", 'genres': ['Drama'], 'title': 'Calloused Hands', 'released': datetime.datetime(2013, 3, 3, 0, 0)}
