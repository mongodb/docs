.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python

         pip install --quiet openai pymongo

   .. step:: Create a function to generate vector embeddings.

      Paste and run the following code in your notebook to create
      a function that generates vector embeddings by using a 
      proprietary embedding model from 
      `OpenAI <http://openai.com>`__. 
      Replace ``<api-key>`` with your OpenAI |api| key.
      This code does the following:

      - Specifies the ``text-embedding-3-small`` embedding model.
      - Creates a function named ``get_embedding`` that calls the model's |api|
        to generate an embedding for a given text input.
      - Generates a single embedding for the string ``foo``.

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

            import os
            from openai import OpenAI

            # Specify your OpenAI API key and embedding model
            os.environ["OPENAI_API_KEY"] = "<api-key>"
            model = "text-embedding-3-small"
            openai_client = OpenAI()

            # Define a function to generate embeddings
            def get_embedding(text):
               """Generates vector embeddings for the given text."""

               embedding = openai_client.embeddings.create(input = [text], model=model).data[0].embedding
               return embedding

            # Generate an embedding
            get_embedding("foo")

         .. output:: 
            :language: sh

            [-0.005843308754265308, -0.013111298903822899, -0.014585349708795547, 0.03580040484666824, 0.02671629749238491, ... ]
            
      .. seealso::

         For |api| details and a list of available models, refer to
         the `OpenAI documentation <https://platform.openai.com/docs/guides/embeddings>`__.
   
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

