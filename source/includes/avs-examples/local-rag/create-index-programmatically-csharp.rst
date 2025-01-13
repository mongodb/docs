.. procedure:: 
   :style: normal 

   .. step:: Define the {+avs+} index.
    
      Add a new ``CreateVectorIndex()`` method in the file named
      ``MongoDBDataService.cs`` to define the search index:

      .. literalinclude:: /includes/avs-examples/local-rag/MongoDBDataService-create-index.cs
         :language: csharp
         :emphasize-lines: 23-71
         :caption: MongoDBDataService.cs

      This index definition specifies indexing the ``embeddings`` field
      in an index of the :ref:`vectorSearch <avs-types-vector-search>` type
      for the ``sample_airbnb.listingsAndReviews`` collection.
      This field contains the embeddings created using the
      embedding model. The index definition specifies ``768`` vector
      dimensions and measures similarity using ``cosine``.

   .. step:: Update your ``Program.cs``.

      Replace the code in your ``Program.cs`` with the following code to
      initialize the ``DataService`` and call the index creation method:

      .. code-block:: csharp
         :copyable: true 

         using MyCompany.RAG.Local;

         var dataService = new MongoDBDataService();
         var result = dataService.CreateVectorIndex();
         Console.WriteLine(result);

   .. step:: Create the {+avs+} index.

      Save the file, and then compile and run your project to create the index:

      .. code-block:: sh
         :copyable: true 

         dotnet run MyCompany.RAG.Local.csproj
