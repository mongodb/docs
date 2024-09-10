.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python

         pip install --quiet nomic sentence-transformers pymongo

   .. step:: Create a function to generate vector embeddings.

      Paste and run the following code in your notebook to create
      a function that generates vector embeddings by using an 
      open-source embedding model from 
      `Nomic AI <https://www.nomic.ai>`__. This code does the following:

      - Loads the `nomic-embed-text-v1 
        <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ embedding model.
      - Creates a function named ``get_embedding`` that uses the model
        to generate an embedding for a given text input.
      - Generates a single embedding for the string ``foo``.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

            from nomic import embed
            from sentence_transformers import SentenceTransformer

            # Load the embedding model (https://huggingface.co/nomic-ai/nomic-embed-text-v1")
            model = SentenceTransformer("nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

            # Define a function to generate embeddings
            def get_embedding(data):
               """Generates vector embeddings for the given data."""

               embedding = model.encode(data)
               return embedding.tolist()
               
            # Generate an embedding
            get_embedding("foo")

         .. output:: 
            :language: sh

            [-0.029808253049850464, 0.03841473162174225, -0.02561120130121708, -0.06707508116960526, 0.03867151960730553, ... ]

   .. include:: /includes/step-avs-store-embeddings.rst

   .. io-code-block:: 
      :copyable: true 
      
      .. input:: 
         :language: python

         # Generate embedding for the search query
         query_embedding = get_embedding("ocean tragedy")

         # Sample vector search pipeline
         pipeline = [
            {
               "$vectorSearch": {
                     "index": "vector_index",
                     "queryVector": query_embedding,
                     "path": "embedding",
                     "exact": true,
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

         {'text': 'Titanic: The story of the 1912 sinking of the largest luxury liner ever built','score': 0.4551968574523926}
         {'text': 'Avatar: A marine is dispatched to the moon Pandora on a unique mission','score': 0.4050074517726898}
         {'text': 'The Lion King: Lion cub and future king Simba searches for his identity','score': 0.3594386577606201}
