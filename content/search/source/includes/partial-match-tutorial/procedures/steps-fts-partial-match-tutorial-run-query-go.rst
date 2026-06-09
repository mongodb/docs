.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``partial-match-tutorial-query.go``.

   .. step:: Copy and paste one of the following queries into the ``partial-match-tutorial-query.go`` file.

      .. tabs::

         .. tab:: autocomplete
            :tabid: autocomplete

            The following query searches for documents where the ``title`` field
            contains words that begin with ``Great``.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/go/queryAutoComplete.go
               :language: go
               :linenos:
               :dedent:

         .. tab:: phrase
            :tabid: phrase

            The following query searches for documents where the ``plot`` field
            contains the phrase ``new york`` with a maximum distance of 5 between terms.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/go/queryPhrase.go
               :language: go
               :linenos:
               :dedent:

         .. tab:: regex
            :tabid: regex

            The following query searches for documents where the ``title`` field
            contains words that match the regular expression pattern.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/go/queryRegex.go
               :language: go
               :linenos:
               :dedent:

         .. tab:: wildcard
            :tabid: wildcard

            The following query searches for documents where the ``title`` field
            contains words that match the wildcard pattern.

            .. literalinclude:: /includes/partial-match-tutorial/code-snippets/go/queryWildcard.go
               :language: go
               :linenos:
               :dedent:

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Run the command to query your collection.

      .. code-block:: bash
         :copyable: true 
           
         go run partial-match-tutorial-query.go
