.. procedure:: 
   :style: normal 

   .. step:: Add the MongoDB C# Driver to your .NET project.

      Add the MongoDB C# Driver as a dependency in your project:

      .. code-block:: sh

         dotnet add package MongoDB.Driver

   .. step:: Define the index.

      Create a file named ``IndexService.cs``. Copy and paste the following
      code into the file, and replace the ``<connection-string>``
      placeholder value.

      .. literalinclude:: /includes/avs-examples/index-management/create-index/filter-example.cs
         :language: csharp
         :copyable: true
         :caption: IndexService.cs
         :emphasize-lines: 11
         :linenos:

      This index definition indexes the ``plot_embedding`` field
      as the ``vector`` type and the ``genres`` and ``year`` fields
      as the ``filter`` type in an {+avs+} index. The ``plot_embedding``
      field contains embeddings created using OpenAI's
      ``text-embedding-ada-002`` embeddings model. The index definition
      specifies ``1536`` vector dimensions and measures similarity using
      ``dotProduct`` function.

   .. step:: Update ``Program.cs``.

      Update ``Program.cs`` to initialize the ``IndexService`` and call the
      method to create the index.

      .. code-block:: csharp
         :caption: Program.cs

         using query_quick_start;

         var indexService = new IndexService();
         indexService.CreateVectorIndex();

   .. step:: Save and run the project.

      Save the file, and then compile and run your project to create the
      index.

      .. io-code-block::
         :copyable: true 

         .. input:: 
            :language: shell 

            dotnet run query_quick_start.csproj

         .. output::
            :language: shell

            New search index named vector_index is building.
            Polling to check if the index is ready. This may take up to a minute.
            vector_index is ready for querying.
