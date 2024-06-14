.. procedure::
   :style: normal

   .. step:: Create the {+avs+} index.

      To enable vector search queries on your data,
      create an {+avs+} index on the ``sample_db.articles`` 
      collection.

      The following index definition specifies the 
      ``text_embedding`` field as the :ref:`vector
      <avs-types-vector-search>` type, ``768`` vector 
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
                    "numDimensions": 768,
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

            {'text': "**Step 9: Analyze Findings**\nReview collected information meticulously. Identify maximum deviations, average variances, patterns, etc. Decide whether remedial actions are needed based on severity and implications of revealed disparities. Common solutions include shimming low spots, grinding high ones, repairing damaged sections, or even consulting experts about potential structural concerns.\n\nBy diligently adhering to this procedure, you'll successfully check your floor's level condition, thereby facilitating informed decisions concerning maintenance, renovation, or construction projects!", 'score': 0.4972769618034363}
            {'text': '**Step 5: Deep Clean Surfaces**\nNow that the room is free of excess clutter, focus on deep cleaning surfaces. Start high and work your way down to avoid recontaminating cleaned areas. Dust light fixtures, ceiling fans, windowsills, shelves, and furniture. Vacuum or sweep floors thoroughly. Mop hard floor surfaces using a suitable cleanser. Pay attention to often neglected spots like baseboards and door frames.\n\nKey Tips:\n- Always start with the highest points to prevent falling dust from settling on already cleaned surfaces.\n- Move large pieces of furniture away from walls to ensure thorough cleaning beneath them.\n- Allow ample drying time before replacing stored items to prevent moisture damage.', 'score': 0.48243528604507446}
            {'text': "Remember to include support columns if needed, especially if designing multi-story structures.\n\n**Step 5: Designing Interiors**\nNow comes the fun part - decorating! Add lighting with torches, lanterns, or glowstone. Install staircases leading upstairs or downstairs. Create cozy seating areas with chairs and tables. Adorn walls with paintings, banners, or vines. And don't forget about adding bathroom facilities!\n\nBe creative but consistent with your theme. If going for a luxury feel, opt for gold accents and fine furniture pieces. Alternatively, go minimalist with clean lines and neutral colors.\n\n**Step 6: Creating Upper Levels & Roofs**\nRepeat steps four and five for additional floors, ensuring structural integrity throughout. When reaching the topmost level, cap off the building with a roof. Common roof shapes include gable, hip, mansard, and skillion. Whichever style you choose, ensure symmetry and proper alignment.", 'score': 0.4739491045475006}
            {'text': '**Step 7: Landscaping Exteriors**\nFinally, beautify your surroundings. Plant trees, flowers, and grass. Dig ponds or rivers nearby. Pathway bricks or gravel paths towards entrances. Build outdoor sitting areas, gardens, or even swimming pools!\n\nAnd there you have it - a grand hotel standing tall amidst the virtual landscape! With careful planning, patient collection of materials, thoughtful interior design, meticulous upper levels, and picturesque landscaping, you now possess both a functional space and impressive architectural feat. Happy building!', 'score': 0.4724790155887604}
            {'text': 'Title: How to Create and Maintain a Compost Pile\n\nIntroduction:\nComposting is an easy and environmentally friendly way to recycle organic materials and create nutrient-rich soil for your garden or plants. By following these steps, you can learn how to build and maintain a successful compost pile that will help reduce waste and improve the health of your plants.\n\n**Step 1: Choose a Location **\nSelect a well-draining spot in your backyard, away from your house or other structures, as compost piles can produce odors. Ideally, locate the pile in partial shade or a location with morning sun only. This allows the pile to retain moisture while avoiding overheating during peak sunlight hours.\n\n_Key tip:_ Aim for a minimum area of 3 x 3 feet (0.9m x 0.9m) for proper decomposition; smaller piles may not generate enough heat for optimal breakdown of materials.', 'score': 0.471458375453949}

