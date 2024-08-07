At the end of your ``Program.cs`` file, add the following code to perform a basic semantic 
search for the string ``What is my job title?``. It prints the most  
relevant document and a :ref:`relevance score <scoring-ref>` between 
``0`` and ``1``.

.. code-block:: csharp
   :copyable: true 
   :linenos: 

   var results = textMemory.SearchAsync(collection: "test", query: "What is my job title?");

   await foreach (var result in results) {
      Console.WriteLine($"Answer: {result?.Metadata.Text}, {result?.Relevance}");
   }
   Console.WriteLine("Search completed.");

Save the file, then run the following command to see the results of the semantic search:

.. io-code-block::
   :copyable: true

   .. input:: 
      :language:  shell

      dotnet run

   .. output:: 

      Answer: I am a developer, 0.8913083076477051
      Search completed.