.. procedure::
   :style: normal

   .. step:: Install the dependencies.

      Ensure that your ``CLASSPATH`` contains the following libraries.

      .. list-table::
         :widths: 30 70 

         * - ``junit``
           - 4.11.0 or higher version 

         * - ``mongodb-driver-sync``
           - 4.11.0 or higher version

         * - ``slf4j-log4j12``
           - 1.7.30 or higher version

      For more detailed installation instructions and version compatibility, see
      the :driver:`MongoDB Java Driver documentation </java/sync/current/get-started/>`.

   .. step:: Run a basic query.
      
      .. include:: /includes/fts/extracts/fts-basic-query-intro.rst
      
      a. Create a new file named ``RunQuery.java`` and paste the following code.

         .. include:: /includes/fts/extracts/fts-basic-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/BasicQuery.java
            :language: java
            :linenos:
            :emphasize-lines: 16

         .. note:: 

            To run the sample code in your Maven environment, add the 
            following above the import statements in your file.

            .. code-block:: 

               package com.mongodb.drivers;

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               javac RunQuery.java
               java RunQuery

            .. output::
               :language: shell
               :visible: false

               {"plot": "A trio of guys try and make up for missed opportunities in childhood by forming a three-player baseball team to compete against standard children baseball squads.", "title": "The Benchwarmers"}
               {"plot": "A young boy is bequeathed the ownership of a professional baseball team.", "title": "Little Big League"}
               {"plot": "A trained chimpanzee plays third base for a minor-league baseball team.", "title": "Ed"}

   .. step:: Refine your search.

      .. include:: /includes/fts/extracts/fts-compound-query-intro.rst       

      a. Modify ``RunQuery.java`` to use the compound query.

         .. include:: /includes/fts/extracts/fts-compound-query-desc.rst

         .. literalinclude:: /includes/fts/quickstart/queries/CompoundQuery.java
            :language: java
            :linenos:
            :emphasize-lines: 22-25, 29, 34

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               javac RunQuery.java
               java RunQuery

            .. output::
               :language: shell
               :visible: false

               {"plot": "The story of the life and career of the famed baseball player, Lou Gehrig.", "genres": ["Biography", "Drama", "Family"], "title": "The Pride of the Yankees"}
               {"plot": "Babe Ruth becomes a baseball legend but is unheroic to those who know him.", "genres": ["Biography", "Drama", "Sport"], "title": "The Babe"}
               {"plot": "Dominican baseball star Miguel \"Sugar\" Santos is recruited to play in the U.S. minor-leagues.", "genres": ["Drama", "Sport"], "title": "Sugar"}

   .. step:: Process your results.

      .. include:: /includes/fts/extracts/fts-process-results-intro.rst

      a. Modify ``RunQuery.java`` to add the :ref:`sort <sort-ref>` option.
         
         .. include:: /includes/fts/extracts/fts-process-results-desc.rst
         
         .. literalinclude:: /includes/fts/quickstart/queries/SortQuery.java
            :language: java
            :linenos:
            :emphasize-lines: 30, 35

      #. Specify the ``<connection-string>``, then run the query:

         .. io-code-block::
            :copyable: true

            .. input::
               :language: bash

               javac RunQuery.java
               java RunQuery

            .. output::
               :language: shell
               :visible: false

               {"plot": "A sports agent stages an unconventional recruitment strategy to get talented Indian cricket players to play Major League Baseball.", "genres": ["Biography", "Drama", "Sport"], "title": "Million Dollar Arm", "released": {"$date": "2014-05-16T00:00:00Z"}}
               {"plot": "A Taiwanese high school baseball team travels to Japan in 1931 to compete in a national tournament.", "genres": ["Biography", "Drama", "History"], "title": "Kano", "released": {"$date": "2014-02-27T00:00:00Z"}}
               {"plot": "12-year-old Josh is a mixed race boy and a promising baseball player. He is abused by his mother's boyfriend Byrd, and neglected by his mother Debbie. He forges his own path in life when ...", "genres": ["Drama"], "title": "Calloused Hands", "released": {"$date": "2013-03-03T00:00:00Z"}}
