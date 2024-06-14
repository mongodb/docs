.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install dependencies:

      .. code-block:: python

         pip install --quiet datasets pandas openai pymongo

      .. note::

         If you experience warnings about version compatibility,
         you can ignore them as they do not prevent you from 
         completing this tutorial.

   .. include:: /includes/step-avs-load-sample-data-embeddings.rst

   .. step:: Create vector embeddings from your data.

      Paste and run the following code in your notebook to create
      vector embeddings by using a proprietary embedding model from 
      `OpenAI <http://openai.com>`__. 
      Replace the placeholder value with your OpenAI |api| key.
      This code does the following:

      - Specifies the ``text-embedding-3-small`` embedding model.
      - Creates a function named ``get_embedding`` that calls on the model's |api|
        to generate an embedding for a given text input.
      - Calls the function to generate embeddings from the 
        ``text`` field in your DataFrame and stores these 
        embeddings in a new ``text_embedding`` field.

      .. code-block:: python

         import os
         from openai import OpenAI

         # Specify your OpenAI API key and embedding model
         os.environ["OPENAI_API_KEY"] = "<api-key>"
         model = "text-embedding-3-small"
         openai_client = OpenAI()

         def get_embedding(text):
            """Generates vector embeddings for the given text."""

            embeddings = openai_client.embeddings.create(input = [text], model=model).data[0].embedding
            return embeddings

         # Creates embeddings and stores them as a new field
         df["text_embedding"] = df["text"].apply(get_embedding)
         df.head()

      .. seealso::

         For |api| details and a list of available models, refer to
         the `OpenAI documentation <https://platform.openai.com/docs/guides/embeddings>`__.
   
   .. include:: /includes/step-avs-store-embeddings.rst
