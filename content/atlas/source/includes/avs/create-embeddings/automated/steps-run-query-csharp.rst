.. procedure:: 
   :style: normal 

   .. step:: Call the RunQuery method.

      In your ``Program.cs`` file, Find the call to the ``CreateIndex`` method inside the
      ``Main`` method. Comment out the call to ``CreateIndex`` and uncomment the call to
      the ``RunQuery`` method, as shown in the following example: 

      .. code-block:: csharp

         //CreateIndex(client, collection, "vector_index");
         RunQuery(client, collection, "vector_index");

   .. step:: Run the following command to query your collection:
  
     .. io-code-block::
        :copyable: true

        .. input::
           :language: bash
     
           dotnet run VectorSearch.csproj
        
        .. output:: /includes/avs/create-embeddings/automated/csharp-query-output.json
           :language: javascript
           :visible: false
           :linenos: