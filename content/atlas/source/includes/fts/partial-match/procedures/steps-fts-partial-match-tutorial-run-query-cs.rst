.. procedure:: 
   :style: normal 

   .. step:: Create a file named ``PartialMatchTutorialQuery.cs``.

   .. step:: Copy and paste one of the following queries into the ``PartialMatchTutorialQuery.cs`` file.

      .. tabs::

         .. tab:: autocomplete
            :tabid: autocomplete

            The following query searches for documents where the ``title`` field
            contains words that begin with ``Great``.

            .. literalinclude:: /includes/fts/partial-match/QueryAutoComplete.cs
               :language: csharp
               :linenos:
               :dedent:

         .. tab:: phrase
            :tabid: phrase

            The following query searches for documents where the ``plot`` field
            contains the phrase ``new york`` with a maximum distance of 5 between terms.

            .. literalinclude:: /includes/fts/partial-match/QueryPhrase.cs
               :language: csharp
               :linenos:
               :dedent:

         .. tab:: regex
            :tabid: regex

            The following query searches for documents where the ``title`` field
            contains words that match the regular expression pattern.

            .. literalinclude:: /includes/fts/partial-match/QueryRegex.cs
               :language: csharp
               :linenos:
               :dedent:

         .. tab:: wildcard
            :tabid: wildcard

            The following query searches for documents where the ``title`` field
            contains words that match the wildcard pattern.

            .. literalinclude:: /includes/fts/partial-match/QueryWildcard.cs
               :language: csharp
               :linenos:
               :dedent:

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the program to query your collection.

      .. code-block:: bash
         :copyable: true
           
         dotnet run PartialMatchTutorialQuery.cs
