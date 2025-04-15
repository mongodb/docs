.. procedure::
   :style: normal

   .. step:: Run a basic query.
      
      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst
      
      a. Create a new file named ``RunQuery.kt`` and paste the following code.

         .. include:: /includes/fts/extracts/fts-basic-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/simple-fts-query.kt
            :language: kotlin
            :linenos:
            :emphasize-lines: 11

      #. Specify the ``<connection-string>``, then run the query:
         
         When you run the ``RunQuery.kt`` program in your IDE, it
         prints the following documents:

         .. code-block:: none
            :copyable: false
            
            Document{{plot=The story of the life and career of the famed baseball player, Lou Gehrig., genres=[Biography, Drama, Family], title=The Pride of the Yankees}}
            Document{{plot=Babe Ruth becomes a baseball legend but is unheroic to those who know him., genres=[Biography, Drama, Sport], title=The Babe}}
            Document{{plot=Dominican baseball star Miguel "Sugar" Santos is recruited to play in the U.S. minor-leagues., genres=[Drama, Sport], title=Sugar}}

   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst      

      a. Modify ``RunQuery.kt`` to use the compound query.
         
         .. include:: /includes/fts/extracts/fts-compound-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/complex-fts-query.kt
            :language: kotlin
            :linenos:
            :emphasize-lines: 18-29, 34, 38

      #. Specify the ``<connection-string>``, then run the query.

         When you run the ``RunQuery.kt`` program in your IDE, it
         prints the following documents:

         .. code-block:: none
            :copyable: false
            
            Document{{plot=The story of the life and career of the famed baseball player, Lou Gehrig., genres=[Biography, Drama, Family], title=The Pride of the Yankees}}
            Document{{plot=Babe Ruth becomes a baseball legend but is unheroic to those who know him., genres=[Biography, Drama, Sport], title=The Babe}}
            Document{{plot=Dominican baseball star Miguel "Sugar" Santos is recruited to play in the U.S. minor-leagues., genres=[Drama, Sport], title=Sugar}}

   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst

      a. Modify ``RunQuery.kt`` to add the :ref:`sort <sort-ref>` option.
        
         .. include:: /includes/fts/extracts/fts-process-results-desc.rst
         
         .. literalinclude:: /includes/fts/quickstart/queries/sort-query.kt
            :language: kotlin
            :linenos:
            :emphasize-lines: 31-32, 37, 41
       
      #. Specify the ``<connection-string>``, then run the query:

         When you run the ``RunQuery.kt`` program in your IDE, it
         prints the following documents:

         .. code-block:: none
            :copyable: false

            Document{{plot=A sports agent stages an unconventional recruitment strategy to get talented Indian cricket players to play Major League Baseball., genres=[Biography, Drama, Sport], title=Million Dollar Arm, released=Thu May 15 19:00:00 CDT 2014}}
            Document{{plot=A Taiwanese high school baseball team travels to Japan in 1931 to compete in a national tournament., genres=[Biography, Drama, History], title=Kano, released=Wed Feb 26 18:00:00 CST 2014}}
            Document{{plot=12-year-old Josh is a mixed race boy and a promising baseball player. He is abused by his mother's boyfriend Byrd, and neglected by his mother Debbie. He forges his own path in life when ..., genres=[Drama], title=Calloused Hands, released=Sat Mar 02 18:00:00 CST 2013}}