
.. procedure::
   :style: normal
      
   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python

         pip install --quiet --upgrade openai pymongo

   .. step:: Define and test a function to generate vector embeddings.

      Paste and run the following code in your notebook to create
      a function that generates vector embeddings by using a 
      proprietary embedding model from 
      `OpenAI <http://openai.com>`__. 
      Replace ``<api-key>`` with your OpenAI |api| key.
      This code does the following:

      - Specifies the ``text-embedding-3-small`` embedding model.
      - Creates a function named ``get_embedding`` that calls the model's |api|
        to generate an embedding for a given text input.
      - Tests the function by generating a single embedding 
        for the string ``foo``.

      .. NOTE: If you edit this Python code, also update the Jupyter Notebooks at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-new-data.ipynb and https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/openai-existing-data.ipynb

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
            embedding = get_embedding("foo")
            print(embedding)

         .. output:: 
            :language: sh

            [-0.005843308754265308, -0.013111298903822899, -0.014585349708795547, 0.03580040484666824, 0.02671629749238491, ... ]
            
      .. seealso::

         For |api| details and a list of available models, refer to
         the `OpenAI documentation
         <https://platform.openai.com/docs/guides/embeddings>`__.
         
      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/avs/extracts/avs-bson-function-python-description.rst

         .. io-code-block::
            :copyable: true 

            .. input:: /includes/avs/create-embeddings/generate_bson_vector.py
               :language: python
         
            .. output:: 
               :language: shell
               :visible: false

               The converted BSON embedding is: b'\'\x00:y\xbf\...\xbb\xdaC\x9a\xbc'
