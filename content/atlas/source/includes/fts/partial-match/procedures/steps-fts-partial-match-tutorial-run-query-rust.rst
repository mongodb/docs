.. procedure:: 
   :style: normal 

   .. step:: Create a project named ``partial-match-query``.

      .. code-block:: shell

         cargo new partial-match-query && cd partial-match-query

      From the ``src`` directory of your project, create a file called ``main.rs``.

   .. step:: Copy and paste the code for the operator for which you created the index into the ``main.rs`` file.

      The following code example performs the following tasks:

      - Imports ``mongodb``, the MongoDB Rust Driver.
      - Creates a ``Client`` instance to establish a 
        connection to your cluster.
      - Runs a query that uses:

        - :pipeline:`$search` stage to look for a term
        - :pipeline:`$limit` stage to limit the output to 5 results
        - :pipeline:`$project` stage to exclude all fields except ``title`` 
          and ``plot``

      - Iterates over the cursor to print the documents that match the 
        query.

      .. tabs::

         .. tab:: autocomplete
            :tabid: autocomplete

            .. include:: /includes/fts/extracts/fts-partial-match-autocomplete-query-desc.rst

            .. literalinclude:: /includes/fts/partial-match/autocomplete-query.rs
               :language: rust
               :linenos:
               :dedent:
               :emphasize-lines: 16

         .. tab:: phrase
            :tabid: phrase

            .. include:: /includes/fts/extracts/fts-partial-match-phrase-query-desc.rst

            .. literalinclude:: /includes/fts/partial-match/phrase-query.rs
               :language: rust
               :linenos:
               :emphasize-lines: 16

         .. tab:: regex
            :tabid: regex

            .. include:: /includes/fts/extracts/fts-partial-match-regex-query-desc.rst

            .. literalinclude:: /includes/fts/partial-match/regex-query.rs
               :language: rust
               :linenos:
               :dedent:
               :emphasize-lines: 16

         .. tab:: wildcard
            :tabid: wildcard
            
            .. include:: /includes/fts/extracts/fts-partial-match-wildcard-query-desc.rst

            .. literalinclude:: /includes/fts/partial-match/wildcard-query.rs
               :language: rust
               :linenos:
               :dedent:
               :emphasize-lines: 16

      .. note::

         .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Run a query on your collection.

      Run the following command to query your collection:

      .. tabs:: 
         :hidden: true

         .. tab:: autocomplete
            :tabid: autocomplete
      
            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
            
                  cargo run
                
               .. output::
                  :language: rust
                  :visible: true

                  Title: Panic Room
                  Plot: A divorced woman and her diabetic daughter take refuge in their newly-purchased house's safe room, when three men break-in, searching for a missing fortune.

                  Title: Her
                  Plot: A lonely writer develops an unlikely relationship with his newly purchased operating system that's designed to meet his every need.

                  Title: Miracles - Mr. Canton and Lady Rose
                  Plot: A country boy becomes the head of a gang through the purchase of some lucky roses from an old lady. He and a singer at the gang's nightclub try to do a good deed for the old lady when her daughter comes to visit.

                  Title: Repo Men
                  Plot: Set in the near future when artificial organs can be bought on credit, it revolves around a man who struggles to make the payments on a heart he has purchased. He must therefore go on the run before said ticker is repossessed.

                  Title: Punch-Drunk Love
                  Plot: A psychologically troubled novelty supplier is nudged towards a romance with an English woman, all the while being extorted by a phone-sex line run by a crooked mattress salesman, and purchasing stunning amounts of pudding.

         .. tab:: phrase
            :tabid: phrase 
      
            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
            
                  cargo run
                
               .. output::
                  :language: rust
                  :visible: true

                  Title: Music Within
                  Plot: The true story of Richard Pimentel, a brilliant public speaker with a troubled past, who returns from Vietnam severely hearing -impaired and finds a new purpose in his landmark efforts on the behalf of Americans with disabilities.

                  Title: Megamind
                  Plot: The supervillain Megamind finally defeats his nemesis, the superhero Metro Man. But without a hero, he loses all purpose and must find new meaning to his life.

                  Title: Pat Garrett & Billy the Kid
                  Plot: An aging Pat Garrett is hired as a lawman on behalf of a group of wealthy New Mexico cattle barons--his sole purpose being to bring down his old friend Billy the Kid.

         .. tab:: regex
            :tabid: regex
      
            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: bash
               
                  cargo run

               .. output:: /includes/fts/partial-match/regex-wildcard-rust-query-results.js
                  :language: rust
                  :visible: true

         .. tab:: wildcard
            :tabid: wildcard
      
            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: bash
               
                  cargo run

               .. output:: /includes/fts/partial-match/regex-wildcard-rust-query-results.js
                  :language: rust
                  :visible: true
