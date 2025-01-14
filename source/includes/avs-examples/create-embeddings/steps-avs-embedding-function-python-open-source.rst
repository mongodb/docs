.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python

         pip install --quiet sentence-transformers pymongo einops

   .. step:: Define a function to generate vector embeddings.

      Paste and run the following code in your notebook to create
      a function that generates vector embeddings by using an 
      open-source embedding model from 
      `Nomic AI <https://www.nomic.ai>`__. This code does the following:

      - Loads the `nomic-embed-text-v1 
        <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ embedding model.
      - Creates a function named ``get_embedding`` that uses the model
        to generate an embedding for a given text input.
      - Tests the function by generating a single embedding 
        for the string ``foo``.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebooks
         at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-new-data.ipynb
         and https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-existing-data.ipynb

      .. io-code-block:: 
         :copyable: true 
         
         .. input:: 
            :language: python

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
            