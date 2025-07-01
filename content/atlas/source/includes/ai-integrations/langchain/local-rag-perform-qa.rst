
.. procedure::
   :style: normal

   .. step:: Use {+avs+} to retrieve relevant documents.

      In this step, you create a retrieval function called
      ``get_query_results`` that runs a sample vector search query.
      It uses the ``get_embedding`` function to create embeddings from the
      search query. Then, it runs the query to return semantically similar
      documents.

      To learn more, see :ref:`return-vector-search-results`.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb

      .. code-block:: python
         
         # Function to get the results of a vector search query
         def get_query_results(query):
            query_embedding = get_embedding(query)

            pipeline = [
               {
                     "$vectorSearch": {
                        "index": "vector_index",
                        "queryVector": query_embedding,
                        "path": "embeddings",
                        "exact": True,
                        "limit": 5
                     }
               }, {
                     "$project": {
                        "_id": 0,
                        "summary": 1,
                        "listing_url": 1,
                        "score": {
                           "$meta": "vectorSearchScore"
                        }
                     }
               }
            ]

            results = collection.aggregate(pipeline)

            array_of_results = []
            for doc in results:
               array_of_results.append(doc)
            return array_of_results
      
      To check that the function returns relevant documents,
      run the following code to query for the search term ``beach house``:

      .. note::
         
         Your output might vary since environment differences
         can introduce slight variations to your embeddings.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb
         
      .. io-code-block::
         :copyable: true

         .. input::
            :language: python
            
            import pprint
            pprint.pprint(get_query_results("beach house"))

         .. output::
            :visible: false

            [{'listing_url': 'https://www.airbnb.com/rooms/10317142',
              'score': 0.84868323802948,
              'summary': 'Ocean Living! Secluded Secret Beach! Less than 20 steps to the '
                         'Ocean! This spacious 4 Bedroom and 4 Bath house has all you need '
                         'for your family or group. Perfect for Family Vacations and '
                         'executive retreats. We are in a gated beachfront estate, with '
                         'lots of space for your activities.'},
             {'listing_url': 'https://www.airbnb.com/rooms/10488837',
              'score': 0.8457906246185303,
              'summary': 'There are 2 bedrooms and a living room in the house. 1 Bathroom. '
                         '1 Kitchen. Friendly neighbourhood. Close to sea side and '
                         'Historical places.'},
             {'listing_url': 'https://www.airbnb.com/rooms/10423504',
              'score': 0.830578088760376,
              'summary': 'This peaceful house in North Bondi is 300m to the beach and a '
                         "minute's walk to cafes and bars. With 3 bedrooms, (can sleep up "
                         'to 8) it is perfect for families, friends and pets. The kitchen '
                         'was recently renovated and a new lounge and chairs installed. '
                         'The house has a peaceful, airy, laidback vibe  - a perfect beach '
                         'retreat. Longer-term bookings encouraged. Parking for one car. A '
                         'parking permit for a second car can also be obtained on '
                         'request.'},
             {'listing_url': 'https://www.airbnb.com/rooms/10548991',
              'score': 0.8174338340759277,
              'summary': 'Newly furnished two story home. The upstairs features a full '
            ...
             {'listing_url': 'https://www.airbnb.com/rooms/10186755',
              'score': 0.8083034157752991,
              'summary': 'Near to underground metro station. Walking distance to seaside. '
                         '2 floors 1 entry. Husband, wife, girl and boy is living.'}]
   
   .. step:: Load the local |llm|.

      a. Click the following button to download the Mistral 7B model
         from GPT4All. To explore other models, refer to the 
         `GPT4All website <https://gpt4all.io/index.html>`__.

         .. button:: Download
            :uri: https://gpt4all.io/models/gguf/mistral-7b-openorca.gguf2.Q4_0.gguf

      #. Move this model into your ``local-rag-mongodb`` project directory.

      #. In your notebook, run the following code to load the local |llm|.

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb

         .. code-block:: python
          
            from gpt4all import GPT4All

            local_llm_path = "./mistral-7b-openorca.gguf2.Q4_0.gguf"
            local_llm = GPT4All(local_llm_path)

   .. step:: Answer questions on your data.

      Run the following code to complete your |rag| implementation.
      This code does the following:

      - Queries your collection for relevant documents by using the function 
        you just defined.

      - Prompts the |llm| using the retrieved documents as context. 
        The generated response might vary.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/use-cases/local-rag.ipynb
   
      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            question = "Can you recommend a few AirBnBs that are beach houses? Include a link to the listing."
            documents = get_query_results(question)

            text_documents = ""
            for doc in documents:
                summary = doc.get("summary", "")
                link = doc.get("listing_url", "")
                string = f"Summary: {summary} Link: {link}. \n"
                text_documents += string

            prompt = f"""Use the following pieces of context to answer the question at the end.
                {text_documents}
                Question: {question}
            """

            response = local_llm.generate(prompt)
            cleaned_response = response.replace('\\n', '\n')
            print(cleaned_response)
            
         .. output:: 

            Answer: Yes, I can recommend a few AirBnB listings that are beach houses. Here they are with their respective links:
            1. Ocean Living! Secluded Secret Beach! Less than 20 steps to the Ocean! (https://www.airbnb.com/rooms/10317142)
            2. Beautiful and comfortable 1 Bedroom Air Conditioned Condo in Makaha Valley - stunning Ocean & Mountain views (https://www.airbnb.com/rooms/10266175)
            3. Peaceful house in North Bondi, close to the beach and cafes (https://www.airbnb.com/rooms/10423504)
            