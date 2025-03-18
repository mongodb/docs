.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python
         
         pip install --quiet --upgrade sentence-transformers pymongo einops

   .. step:: Define and test the function to generate vector embeddings.

      Paste and run the following code in your notebook to create
      a function that generates vector embeddings by using an 
      open-source embedding model from 
      `Nomic AI <https://www.nomic.ai>`__. This code does the following:

      - Loads the `nomic-embed-text-v1 
        <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ embedding model.
      - Creates a function named ``get_embedding`` that uses the model
        to generate embeddings for a given text input. The default 
        precision is ``float32``.
      - Generates embeddings for the string, ``foo``.

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            from sentence_transformers import SentenceTransformer

            # Load the embedding model
            model = SentenceTransformer("nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

            # Define a function to generate embeddings
            def get_embedding(data, precision="float32"):
               return model.encode(data, precision=precision).tolist()

            # Generate an embedding
            embedding = get_embedding("foo")
            print(embedding)

         .. output:: 
            :language: shell
            :visible: false

            [-0.02980827  0.03841474 -0.02561123 ... -0.0532876 -0.0335409 -0.02591543]  


      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/extracts/avs-bson-function-python-description.rst

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/avs-examples/create-embeddings/generate_bson_vector.py
               :language: python
         
            .. output:: 
               :language: shell
               :visible: false

               The converted BSON embedding is: [Binary(b'\'\x00x0\xf4\ ... x9bL\xd4\xbc', 9), Binary(b'\'\x007 ... \x9e?\xe6<', 9)]
