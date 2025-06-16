At the end of the ``Program`` class in your ``Program.cs`` file, add the following code to perform a basic semantic 
search for the string ``What is my job title?``. It prints the most  
relevant document.

.. code-block:: csharp
   :copyable: true 
   :linenos: 

   // Create a text search instance using the InMemory vector store.
   var textSearch = new VectorStoreTextSearch<DataModel>(recordCollection, embeddingGenerator);

   // Search and return results as TextSearchResult items
   var query = "What is my job title?";
   KernelSearchResults<TextSearchResult> textResults = await textSearch.GetTextSearchResultsAsync(query, new() { Top = 2, Skip = 0 });
   await foreach (TextSearchResult result in textResults.Results)
   {
      Console.WriteLine($"Answer: {result.Value}");
   }
   Console.WriteLine("Search completed.");

Save the file, then run the following command to see the results of the semantic search:

.. io-code-block::
   :copyable: true

   .. input:: 
      :language:  shell

      dotnet run

   .. output:: 

      Answer: I am a developer
      Search completed.