.. procedure::
   :style: normal

   .. step:: Define a ``DataService`` class.

      Create a new class in a same-named file named ``DataService.cs`` and
      paste the following code. This code defines an async Task named
      ``AddDocumentsAsync`` add documents to |service|. This function uses the
      :driver:`Collection.InsertManyAsync() </csharp/current/usage-examples/insertMany/>`
      C# Driver method to insert a list of the ``BsonDocument`` type. Each
      document contains:

      - A ``text`` field that contains the movie summary.
      - An ``embedding`` field that contains the array of floats from generating
        the vector embeddings.

      .. literalinclude:: /includes/avs-examples/tutorial/DataService-AddDocumentsAsync.cs
         :language: csharp
         :copyable:
         :caption: DataService.cs

   .. step:: Update the ``Program.cs`` in your project.
            
      Use the following code to generate embeddings from an existing
      collection in |service|.
      
      Specifically, this code uses the ``GetEmbeddingsAsync`` function 
      that you defined to generate embeddings from an array 
      of sample texts and ingest them into the ``sample_db.embeddings`` 
      collection in |service|.

      .. literalinclude:: /includes/avs-examples/tutorial/Program-AddDocumentsFromNewData.cs
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

            Successfully inserted 3 documents into Atlas
       
      You can also view your vector embeddings :ref:`in the {+atlas-ui+}
      <atlas-ui-view-collections>` by navigating to the ``sample_db.embeddings`` 
      collection in your {+cluster+}.
