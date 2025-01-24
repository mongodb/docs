.. procedure::
   :style: normal

   .. step:: Define a ``DataService`` class.
      
      Create a new class in a same-named file named ``DataService.cs`` and
      paste the following code. This code creates two functions that do
      the following:

      - Connect to your |service| {+cluster+}.

      - The ``GetDocuments`` method gets a subset of documents from the 
        ``sample_airbnb.listingsAndReviews`` collection that 
        have a non-empty ``summary`` field.

      - The ``AddEmbeddings`` async Task creates a new ``embeddings`` field
        on documents in the ``sample_airbnb.listingsAndReviews`` collection
        whose ``_id`` matches one of the documents retrieved in the
        ``GetDocuments`` method.

      .. literalinclude:: /includes/avs-examples/tutorial/DataService-AddEmbeddingsExisting.cs
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

      .. literalinclude:: /includes/avs-examples/tutorial/Program-AddEmbeddingsExisting.cs
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

            Generating embeddings.
            50 documents updated successfully.
