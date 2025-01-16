.. procedure:: 
   :style: normal

   .. step:: Create a file named ``DataService.cs``.

   .. step:: Copy and paste the code for the pre-filter operator you want to try into the ``DataService.cs`` file.

      .. include:: /includes/extracts/fts-vector-search-tutorial-queries-desc.rst 

      .. tabs:: 

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. include:: /includes/extracts/fts-vector-search-tutorial-simple-query-desc.rst

            .. literalinclude:: /includes/avs-examples/tutorial/DataService-PerformVectorQuery-Filter-by-And-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :caption: DataService.cs
               :emphasize-lines: 8


         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. include:: /includes/extracts/fts-vector-search-tutorial-advanced-query-desc.rst

            .. literalinclude:: /includes/avs-examples/tutorial/DataService-PerformVectorQuery-Filter-by-Or-And-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :caption: DataService.cs
               :emphasize-lines: 8

   .. step:: Replace the ``<connection-string>`` with your |service| connection string and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Update ``Program.cs``.

      Update ``Program.cs`` to initialize the ``DataService`` and call the
      method to perform the query.

      .. literalinclude:: /includes/avs-examples/tutorial/Program-SemanticSearch.cs
         :language: csharp
         :linenos:
         :dedent:
         :caption: Program.cs

   .. step:: Save and run the project.

      Save the file, and then compile and run your project to perform the query.
      
      .. tabs:: 
         :hidden:

         .. tab:: Pre-Filter by AND Operator 
            :tabid: and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell 

                  dotnet run query_quick_start.csproj

               .. output:: /includes/avs-examples/tutorial/filter-by-and-query-csharp-output.sh
                  :language: shell
                  :linenos:
                  :visible: true

         .. tab:: Pre-Filter by OR and AND Operators 
            :tabid: or-and-operator

            .. io-code-block::
               :copyable: true 

               .. input:: 
                  :language: shell

                  dotnet run query_quick_start.csproj

               .. output:: /includes/avs-examples/tutorial/filter-by-or-and-query-csharp-output.sh
                  :language: shell
                  :linenos:
                  :visible: true
