.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      you must create an {+avs+} index on your
      collection.

      Complete the following steps to create an index on the
      ``sample_airbnb.listingsAndReviews`` collection that specifies the 
      ``embeddings`` field as the :ref:`vector
      <avs-types-vector-search>` type 
      and the similarity measure as ``euclidean``.

      a. Paste the following code to add the ``CreateVectorIndex`` function to
         your ``DataService`` class in ``DataService.cs``.

         .. literalinclude:: /includes/avs/tutorial/DataService-CreateVectorIndexExisting.cs
            :language: csharp
            :copyable:
            :caption: DataService.cs
            :emphasize-lines: 21-69

      #. Replace the ``<dimensions>`` placeholder value with ``1024`` if you
         used the open-source model and ``1536`` if you used the model from
         OpenAI.

      #. Update the code in your ``Program.cs``.

         Remove the code that added embeddings to the existing documents, and
         replace it with the following code to create the index:

         .. literalinclude:: /includes/avs/tutorial/Program-CreateVectorIndex.cs
            :language: csharp
            :copyable:
            :caption: Program.cs

      #. Save the file, and then compile and run your project to create the index:

         .. io-code-block::
            :copyable: true

            .. input::
               
               dotnet run MyCompany.Embeddings

            .. output::

               New search index named vector_index is building.
               Polling to check if the index is ready. This may take up to a minute.
               vector_index is ready for querying.

      .. note::
         
         .. include:: /includes/fact-index-build-initial-sync.rst
            
      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 
      
      a. Paste the following code to add a ``PerformVectorQuery`` function to
         your ``DataService`` class in ``DataService.cs``.

         .. include:: /includes/avs/tutorial/avs-run-query-description.rst

         .. literalinclude:: /includes/avs/tutorial/DataService-PerformVectorQueryExisting.cs
            :language: csharp
            :copyable:
            :caption: DataService.cs
            :emphasize-lines: 26-61

      #. Update the code in your ``Program.cs``.

         Remove the code that created the vector index, and add code to perform
         a query:

         .. literalinclude:: /includes/avs/tutorial/Program-PerformVectorQueryExisting.cs
            :language: csharp
            :copyable:
            :caption: Program.cs

      #. Save the file, and then compile and run your project to perform the
         query:
         
         .. io-code-block:: 
            :copyable: true
                  
            .. input:: 

               dotnet run MyCompany.Embeddings.csproj

            .. output:: /includes/avs/tutorial/output-existing-open-source-csharp.sh
               :language: shell   
