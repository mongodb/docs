.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      create an {+avs+} index on the ``sample_db.articles`` 
      collection.

      The following index definition specifies the 
      ``text_embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type, ``1536`` vector 
      dimensions, and the similarity measure as ``euclidean``.
      The method you can use to create the index depends 
      on your {+cluster+} tier:

      - For free and shared {+clusters+}, follow the steps to 
        :ref:`create an index through the {+atlas-ui+} 
        <avs-create-index>`. Name the index ``vector_index``
        and use the following index definition:
            
        .. code-block:: json
           :copyable: true 

           {
              "fields": [
                 {
                    "type": "vector",
                    "path": "text_embedding",
                    "numDimensions": 1536,
                    "similarity": "euclidean"
                 }
              ]
           }

      - For {+dedicated-clusters+}, you can also 
        create the index by using a supported MongoDB driver. Paste and run the following code
        in your notebook to create the index by using the PyMongo driver helper method:

        .. code-block:: python
           :copyable: true 

           from pymongo.operations import SearchIndexModel

           # Create your index model, then create the search index
           search_index_model = SearchIndexModel(
             definition = {
               "fields": [
                 {
                   "type": "vector",
                   "path": "text_embedding",
                   "numDimensions": 768,
                   "similarity": "euclidean"
                 }
               ]
             },
             name="vector_index",
             type="vectorSearch",
           )
           collection.create_search_index(model=search_index_model)
                  
      To learn more, see :ref:`avs-create-index`.

   .. step:: Create embeddings for vector search queries and run a query. 

      To generate the :ref:`query vector <vectorSearch-agg-pipeline-options>`  
      for your vector search queries, you can use the same method that 
      you used to create embeddings from your data.

      For example, paste and run the following code to
      do the following:

      - Create an embedding for the string *home improvement* by
        calling the embedding function that you defined in the 
        :ref:`previous example <create-embeddings-examples>`.

      - Pass the embedding into the ``queryVector`` 
        field in your aggregation pipeline.

      - Run a sample vector search query  
        and return the output.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

            # Generate embedding for the search query
            query_embedding = get_embedding("home improvement")

            # Sample vector search pipeline
            pipeline = [
               {
                  "$vectorSearch": {
                        "index": "vector_index",
                        "queryVector": query_embedding,
                        "path": "text_embedding",
                        "numCandidates": 100,
                        "limit": 5
                  }
               }, 
               {
                  "$project": {
                     "_id": 0, 
                     "text": 1,
                     "score": {
                        "$meta": "vectorSearchScore"
                     }
                  }
               }
            ]

            # Execute the search
            results = collection.aggregate(pipeline)

            # Print results
            for i in results:
               print(i)

         .. output:: 
            :language: json

            {'text': '**Step 6: Regular Maintenance**\nAfter investing effort into cleaning and organizing a crowded room, maintaining its orderliness is crucial. Establish habits that promote ongoing tidiness, such as regularly putting things back where they belong, scheduling weekly cleanup sessions, and addressing new clutter promptly rather than letting it accumulate over time.\n\nBy consistently applying these steps, you can successfully clean and maintain a very crowded room, creating a peaceful and enjoyable living space.', 'score': 0.42446020245552063}
            {'text': "**Step 9: Analyze Findings**\nReview collected information meticulously. Identify maximum deviations, average variances, patterns, etc. Decide whether remedial actions are needed based on severity and implications of revealed disparities. Common solutions include shimming low spots, grinding high ones, repairing damaged sections, or even consulting experts about potential structural concerns.\n\nBy diligently adhering to this procedure, you'll successfully check your floor's level condition, thereby facilitating informed decisions concerning maintenance, renovation, or construction projects!", 'score': 0.421939879655838}
            {'text': 'Check If a Floor Is Level: A Comprehensive Step-by-Step Guide\n==========================================================\n\nA level floor is crucial for various reasons such as safety, aesthetics, and proper functioning of appliances or furniture that require stability. This tutorial will guide you through checking whether your floor is level with accuracy and precision using tools available at most hardware stores. By following these steps, you can identify any irregularities, enabling necessary corrections before installing new floors, fixtures, or equipment.\n\n**Duration:** Approximately 30 minutes (excluding correction time)', 'score': 0.4213894307613373}
            {'text': '**Step 7: Landscaping Exteriors**\nFinally, beautify your surroundings. Plant trees, flowers, and grass. Dig ponds or rivers nearby. Pathway bricks or gravel paths towards entrances. Build outdoor sitting areas, gardens, or even swimming pools!\n\nAnd there you have it - a grand hotel standing tall amidst the virtual landscape! With careful planning, patient collection of materials, thoughtful interior design, meticulous upper levels, and picturesque landscaping, you now possess both a functional space and impressive architectural feat. Happy building!', 'score': 0.41135403513908386}
            {'text': "**Step 2: Gather Necessary Materials**\nTo efficiently clean a crowded room, gather all necessary materials beforehand. Some essential items include:\n\n* Trash bags\n* Recycling bins or bags\n* Boxes or storage containers\n* Cleaning supplies (e.g., broom, vacuum cleaner, dustpan, mop, all-purpose cleaner)\n* Gloves\n* Label maker or markers\n\nHaving everything at hand ensures smooth progress without wasting time searching for tools during the cleaning process.\n\n**Step 3: Declutter Systematically**\nStart by removing unnecessary items from the room. Divide objects into categories such as trash, recyclables, donations, and items to keep. Be ruthless when deciding which belongings are truly valuable or needed. If you haven't used something within the past year, consider whether it's worth keeping. Donating unused items not only frees up space but also benefits those in need.", 'score': 0.407828688621521}
      
      .. seealso::

         You can also create embeddings by calling the |api| endpoint directly.
         To learn more, see `OpenAI API Reference 
         <https://platform.openai.com/docs/api-reference/embeddings>`__.
