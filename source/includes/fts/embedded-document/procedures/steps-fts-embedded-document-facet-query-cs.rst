.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``embedded-documents-query`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir embedded-documents-facet-query
            cd embedded-documents-facet-query
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-intro.rst

      .. literalinclude:: /includes/fts/embedded-document/facet-query.cs
         :language: csharp
         :linenos:
         :dedent:
         :emphasize-lines: 9

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.

      .. io-code-block::
         :copyable: true

         .. input::
            :language: bash
        
            dotnet run embedded-documents-facet-query.csproj

         .. output:: 
            :language: javascript

            { 
              "count" : { "lowerBound" : NumberLong(3), "total" : null }, 
              "facet" : { 
                "gradeFacet" : { 
                  "buckets" : [
                    { "_id" : "12th", "count" : NumberLong(3) }, 
                    { "_id" : "9th", "count" : NumberLong(3) }, 
                    { "_id" : "10th", "count" : NumberLong(2) }, 
                    { "_id" : "11th", "count" : NumberLong(1) }
                  ] 
                } 
              } 
            }

      .. include:: /includes/fts/extracts/fts-embedded-document-facet-query-results.rst
