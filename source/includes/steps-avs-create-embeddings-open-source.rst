.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install dependencies:

      .. code-block:: python

         pip install --quiet datasets pandas nomic sentence-transformers einops pymongo

      .. note::

         If you experience warnings about version compatibility,
         you can ignore them as they do not prevent you from 
         completing this tutorial.
         
   .. include:: /includes/step-avs-load-sample-data-embeddings.rst

   .. step:: Create vector embeddings from your data.

      Paste and run the following code in your notebook to create
      vector embeddings by using an open-source embedding model from 
      `Nomic AI <https://www.nomic.ai>`__. This code does the following:

      - Loads the `nomic-embed-text-v1 
        <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ embedding model.
      - Creates a function named ``get_embedding`` that uses the model
        to generate an embedding for a given text input.
      - Calls the function to generate embeddings from the 
        ``text`` field in your DataFrame and stores these 
        embeddings in a new ``text_embedding`` field.

      .. code-block:: python

         from nomic import embed
         from sentence_transformers import SentenceTransformer

         # Load the embedding model (https://huggingface.co/nomic-ai/nomic-embed-text-v1")
         model = SentenceTransformer("nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

         def get_embedding(text):
            """Generates vector embeddings for the given text."""

            embedding = model.encode(text)
            return embedding.tolist()

         # Creates embeddings and stores them as a new field
         df["text_embedding"] = df["text"].apply(get_embedding)
         df.head()

   .. include:: /includes/step-avs-store-embeddings.rst
