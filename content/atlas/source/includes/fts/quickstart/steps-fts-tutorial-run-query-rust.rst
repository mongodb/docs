.. procedure::
   :style: normal

   .. step:: Run a basic query.
      
      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst
      
      a. Create a new file named ``src/main.rs`` and paste the following code.

         .. include:: /includes/fts/extracts/fts-basic-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/simple-fts-query.rs
            :language: rust
            :linenos:
            :emphasize-lines: 17

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               cargo run

            .. output::
               :language: shell
               :visible: false

               { "title": "The Benchwarmers", "plot": "A trio of guys try and
               make up for missed opportunities in childhood by forming a
               three-player baseball team to compete against standard children
               baseball squads." } { "title": "Ed", "plot": "A trained
               chimpanzee plays third base for a minor-league baseball team." }
               { "title": "Little Big League", "plot": "A young boy is
               bequeathed the ownership of a professional baseball team." }

   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst      

      a. Modify ``src/main.rs`` to use the compound query.

         .. include:: /includes/fts/extracts/fts-compound-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/complex-fts-query.rs
            :language: rust
            :linenos:
            :emphasize-lines: 22-25, 33-40, 52

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               cargo run

            .. output::
               :language: shell
               :visible: false

               Title: 'The Babe'
               Plot: 'Babe Ruth becomes a baseball legend but is unheroic to those who know him.'
               Genres: ["Biography", "Drama", "Sport"]

               Title: 'The Pride of the Yankees'
               Plot: 'The story of the life and career of the famed baseball player, Lou Gehrig.'
               Genres: ["Biography", "Drama", "Family"]

               Title: 'Sugar'
               Plot: 'Dominican baseball star Miguel "Sugar" Santos is recruited to play in the U.S. minor-leagues.'
               Genres: ["Drama", "Sport"]

   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst

      a. Modify ``src/main.rs`` to add the :ref:`sort <sort-ref>` option.

         .. include:: /includes/fts/extracts/fts-process-results-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/sort-query.rs
            :language: rust
            :linenos:
            :emphasize-lines: 42-43, 56
        
      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               cargo run

            .. output::
               :language: shell
               :visible: false

               Title: "Million Dollar Arm"
               Plot: "A sports agent stages an unconventional recruitment strategy to get talented Indian cricket players to play Major League Baseball."
               Genres: ["Biography", "Drama", "Sport"]
               Released: DateTime(2014-05-16 0:00:00.0 +00:00:00)

               Title: "Kano"
               Plot: "A Taiwanese high school baseball team travels to Japan in 1931 to compete in a national tournament."
               Genres: ["Biography", "Drama", "History"]
               Released: DateTime(2014-02-27 0:00:00.0 +00:00:00)

               Title: "Calloused Hands"
               Plot: "12-year-old Josh is a mixed race boy and a promising baseball player. He is abused by his mother's boyfriend Byrd, and neglected by his mother Debbie. He forges his own path in life when ..."
               Genres: ["Drama"]
               Released: DateTime(2013-03-03 0:00:00.0 +00:00:00)