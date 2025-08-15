.. procedure:: 
   :style: normal

   .. step:: Create a file named ``partial-match-tutorial-query.c``.

   .. step:: Copy and paste one of the following queries into the ``partial-match-tutorial-query.c`` file.

      .. tabs:: 

         .. tab:: autocomplete
            :tabid: autocomplete

            The following query searches for documents where the ``title`` field
            contains words that begin with ``Great``.

            .. literalinclude:: /includes/fts/partial-match/queryAutoComplete.c
               :language: c
               :linenos:
               :dedent:

         .. tab:: phrase
            :tabid: phrase

            The following query searches for documents where the ``plot`` field
            contains the phrase ``new york`` with a maximum distance of 5 between terms.

            .. literalinclude:: /includes/fts/partial-match/queryPhrase.c
               :language: c
               :linenos:
               :dedent:

         .. tab:: regex
            :tabid: regex

            The following query searches for documents where the ``title`` field
            contains words that match the regular expression pattern.

            .. literalinclude:: /includes/fts/partial-match/queryRegex.c
               :language: c
               :linenos:
               :dedent:

         .. tab:: wildcard
            :tabid: wildcard

            The following query searches for documents where the ``title`` field
            contains words that match the wildcard pattern.

            .. literalinclude:: /includes/fts/partial-match/queryWildcard.c
               :language: c
               :linenos:
               :dedent:

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the program to query your collection.

      .. code-block:: bash
         :copyable: true 

         gcc -o partial-match-tutorial-query partial-match-tutorial-query.c $(pkg-config --cflags --libs libmongoc-1.0)
         ./partial-match-tutorial-query
