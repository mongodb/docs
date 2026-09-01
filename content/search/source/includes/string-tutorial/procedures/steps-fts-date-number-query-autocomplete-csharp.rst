.. procedure::
   :style: normal

   .. step:: Create a new directory called ``date-number-to-string-query`` and initialize your project with the ``dotnet new`` command.

      .. code-block:: bash

         mkdir date-number-to-string-query
         cd date-number-to-string-query
         dotnet new console

   .. step:: Add the .NET/C# driver to your project as a dependency.

      .. code-block:: bash

         dotnet add package MongoDB.Driver

   .. step:: Replace the contents of the ``Program.cs``  file with the following code for the operator for which you created the index and the type of query you wish to run.

      .. include:: /includes/string-tutorial/facts/fts-query-intro.rst

      .. include:: /includes/string-tutorial/facts/fts-csharp-query-desc.rst

      .. tabs::

         .. tab:: Year Search
            :tabid: yearquery

            .. include:: /includes/string-tutorial/facts/fts-date-query-desc.rst

            .. literalinclude:: /includes/string-tutorial/code-snippets/csharp/autocomplete-date-to-string-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

         .. tab:: Number Search
            :tabid: numericquery

            .. include:: /includes/string-tutorial/facts/fts-numeric-query-desc.rst

            .. literalinclude:: /includes/string-tutorial/code-snippets/csharp/autocomplete-number-to-string-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

            .. include:: /includes/shared/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run the ``Program.cs`` file.

      .. tabs::
         :hidden:

         .. tab:: Year Search
            :tabid: yearquery

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  dotnet run Program.cs

               .. output:: /includes/string-tutorial/code-snippets/json/autocomplete-date-java-csharp-query-results.json
                  :language: json
                  :linenos:
                  :visible: false

         .. tab:: Number Search
            :tabid: numericquery

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: shell

                  dotnet run Program.cs

               .. output:: /includes/string-tutorial/code-snippets/json/autocomplete-numeric-java-csharp-query-results.json
                  :language: json
                  :linenos:
                  :visible: false
