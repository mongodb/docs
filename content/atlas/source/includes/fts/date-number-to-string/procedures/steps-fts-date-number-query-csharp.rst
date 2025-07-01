.. procedure:: 
   :style: normal

   .. step:: Create a new directory called ``date-number-to-string-query`` and initialize your project with the ``dotnet new`` command.

      .. code-block:: bash

         mkdir date-number-to-string-query
         cd date-number-to-string-query
         dotnet new console

   .. step:: Add the .NET/C# Driver to your project as a dependency.

      .. code-block:: bash

         dotnet add package MongoDB.Driver

   .. step:: Replace the contents of the ``Program.cs``  file with the following code for the operator for which you created the index and the type of query you wish to run.
 
      .. include:: /includes/fts/extracts/fts-query-intro.rst 

      .. tabs:: 

         .. tab:: queryString Operator 
            :tabid: querystring

            .. include:: /includes/fts/extracts/fts-csharp-query-desc.rst

            .. tabs:: 

               .. tab:: AND Query 
                  :tabid: and-query 

                  .. include:: /includes/fts/extracts/fts-and-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-and-query.cs
                     :language: csharp
                     :linenos:
                     :dedent:
                     :emphasize-lines: 9

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. include:: /includes/fts/extracts/fts-or-query-desc.rst

                  .. literalinclude:: /includes/fts/date-number-to-string/querystring-or-query.cs
                     :language: csharp
                     :linenos:
                     :dedent:
                     :emphasize-lines: 9

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. include:: /includes/fts/extracts/fts-csharp-query-desc.rst

            .. tabs:: 

               .. tab:: Year Search
                  :tabid: yearquery

                  .. include:: /includes/fts/extracts/fts-date-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-date-to-string-query.cs
                     :language: csharp
                     :linenos:
                     :dedent:
                     :emphasize-lines: 9

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

               .. tab:: Number Search
                  :tabid: numericquery

                  .. include:: /includes/fts/extracts/fts-numeric-query-desc.rst 

                  .. literalinclude:: /includes/fts/date-number-to-string/autocomplete-number-to-string-query.cs
                     :language: csharp
                     :linenos:
                     :dedent:
                     :emphasize-lines: 9

                  .. include:: /includes/fts/facts/fact-fts-driver-connection-string.rst

   .. step:: Compile and run the ``Program.cs`` file.

      .. tabs:: 
         :hidden:

         .. tab:: queryString Operator 
            :tabid: querystring

            .. tabs:: 
               :hidden:

               .. tab:: AND Query 
                  :tabid: and-query 
                     
                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        dotnet run Program.cs

                     .. output:: /includes/fts/date-number-to-string/querystring-and-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: OR Query 
                  :tabid: or-query 

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        dotnet run Program.cs

                     .. output:: /includes/fts/date-number-to-string/querystring-or-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

         .. tab:: autocomplete Operator 
            :tabid: autocomplete

            .. tabs:: 
               :hidden:

               .. tab:: Year Search
                  :tabid: yearquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        dotnet run Program.cs

                     .. output:: /includes/fts/date-number-to-string/autocomplete-date-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true

               .. tab:: Number Search
                  :tabid: numericquery

                  .. io-code-block::
                     :copyable: true 

                     .. input:: 
                        :language: shell 
                        
                        dotnet run Program.cs

                     .. output:: /includes/fts/date-number-to-string/autocomplete-numeric-java-csharp-query-results.json
                        :language: json 
                        :linenos:
                        :visible: true
