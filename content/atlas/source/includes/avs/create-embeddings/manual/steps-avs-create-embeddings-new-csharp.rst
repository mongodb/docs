.. procedure::
   :style: normal

   .. step:: Define a ``DataService`` class.

      Create a new class in a same-named file named ``DataService.cs`` and
      paste the following code. This code defines an async Task named
      ``AddDocumentsAsync`` add documents to MongoDB. This function uses the
      :ref:`Collection.InsertManyAsync() <csharp-insert-guide>`
      C# Driver method to insert a list of the ``BsonDocument`` type. Each
      document contains:

      - A ``text`` field that contains the movie summary.
      - An ``embedding`` field that contains the array of floats from generating
        the vector embeddings.

      .. literalinclude:: /includes/avs/tutorial/DataService-AddDocumentsAsync.cs
         :language: csharp
         :copyable:
         :caption: DataService.cs

   .. step:: Update the ``Program.cs`` in your project.
            
      Use the following code to generate embeddings from an existing
      collection.
      
      Specifically, this code uses the ``GetEmbeddingsAsync()`` function 
      that you defined to generate embeddings from an array 
      of sample texts and ingest them into the ``sample_db.embeddings`` 
      collection.

      .. literalinclude:: /includes/avs/tutorial/Program-AddDocumentsFromNewData.cs
         :language: csharp
         :copyable:
         :caption: Program.cs

   .. step:: Compile and run your project.

      .. io-code-block:: 
         :copyable: true 

         .. input::

            dotnet run MyCompany.Embeddings.csproj

         .. output:: 
            :language: sh

            Successfully inserted 3 documents
       
      .. include:: /includes/avs/facts/fact-view-embeddings-atlas-ui-new-data.rst
