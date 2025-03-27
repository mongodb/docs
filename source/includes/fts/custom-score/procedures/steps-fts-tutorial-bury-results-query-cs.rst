.. procedure:: 
   :style: normal 

   .. step:: Set up and initialize the .NET/C# project for the query.

      a. Create a new directory called ``compound-bury-results`` and
         initialize your project with the dotnet new command. 
  
         .. code-block:: bash

            mkdir compound-bury-results
            cd compound-bury-results
            dotnet new console

      #. Add the .NET/C# Driver to your project as a dependency.

         .. code-block:: bash

            dotnet add package MongoDB.Driver

   .. step:: Copy and paste the query into the ``Program.cs`` file.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. include:: /includes/fts/extracts/fts-compound-bury-category-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-category-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. include:: /includes/fts/extracts/fts-compound-bury-id-stages.rst

            .. literalinclude:: /includes/fts/custom-score/bury-documents-query.cs
               :language: csharp
               :linenos:
               :dedent:
               :emphasize-lines: 9

   .. step:: Replace the ``<connection-string>`` in the query and then save the file.

      Ensure that your connection string includes your database user's
      credentials. To learn more, see :ref:`connect-via-driver`. 

   .. step:: Compile and run the ``Program.cs`` file.

      .. tabs:: 
            
         .. tab:: Bury Documents in a Category 
            :tabid: bury-genre

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run compound-bury-results.csproj

               .. output:: /includes/fts/custom-score/bury-category-csharp-results.json
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-genre-results.rst 

         .. tab:: Bury Specified Documents 
            :tabid: bury-id

            .. io-code-block::
               :copyable: true

               .. input::
                  :language: bash
        
                  dotnet run compound-bury-results.csproj

               .. output:: /includes/fts/custom-score/bury-documents-csharp-results.json
                  :language: javascript

            .. include:: /includes/fts/extracts/fts-compound-bury-id-results.rst 
        