.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python
         
         pip install --quiet --upgrade sentence-transformers pymongo einops

   .. step:: Define the function to generate vector embeddings.

      Paste and run the following code in your notebook to create
      a function that generates vector embeddings by using an 
      open-source embedding model from 
      `Nomic AI <https://www.nomic.ai>`__. This code does the following:

      - Loads the `nomic-embed-text-v1 
        <https://huggingface.co/nomic-ai/nomic-embed-text-v1>`__ embedding model.
      - Creates a function named ``get_embedding`` that uses the model
        to generate ``float32`` (the default precision),
        ``int8``, or ``int1`` embeddings for a given text input. 

      .. code-block:: python

         from sentence_transformers import SentenceTransformer

         # Load the embedding model
         model = SentenceTransformer("nomic-ai/nomic-embed-text-v1", trust_remote_code=True)

         # Define a function to generate embeddings in multiple precisions
         def get_embedding(data, precision="float32"):
             return model.encode(data, precision=precision)

   .. step:: Define the function to convert vector embeddings.

      Paste and run the following code in your notebook to create
      a function named ``generate_bson_vector`` that converts the full-fidelity embeddings
      to |bson| ``float32``, ``int8``, and ``int1`` ``vector`` subtypes
      for :ref:`efficient processing <avs-bindata-vector-subtype>` of
      your vector data.

      .. code-block:: python

         from bson.binary import Binary

         # Generate BSON vector using `BinaryVectorDtype`
         def generate_bson_vector(vector, vector_dtype):
             return Binary.from_vector(vector, vector_dtype)

   .. step:: Define the function to create documents with the embeddings.

      Paste and run the following code in your notebook to create
      a function named ``create_docs_with_bson_vector_embeddings`` that
      creates the documents with embeddings that you will ingest into |service|.

      .. code-block:: python

         # Function to create documents with BSON vector embeddings
         def create_docs_with_bson_vector_embeddings(bson_float32, bson_int8, bson_int1, data):
           docs = []
           for i, (bson_f32_emb, bson_int8_emb, bson_int1_emb, text) in enumerate(zip(bson_float32, bson_int8, bson_int1, data)):
                 doc = {
                     "_id": i,
                     "data": text,
                     "BSON-Float32-Embedding": bson_f32_emb,
                     "BSON-Int8-Embedding": bson_int8_emb,
                     "BSON-Int1-Embedding": bson_int1_emb,
                 }
                 docs.append(doc)
           return docs

   .. step:: Test the function to generate embeddings. 

      Paste and run the following code in your notebook to test the
      ``get_embedding`` function.
      
      This code generates ``float32``, ``int8``, ``int1`` embeddings
      for the strings ``foo`` and ``bar``. 

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebooks
         at https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-new-data.ipynb
         and https://github.com/mongodb/docs-notebooks/blob/main/create-embeddings/open-source-existing-data.ipynb

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            # Example generating embeddings for the strings "foo" and "bar"
            data = ["foo", "bar"]
            float32_embeddings = get_embedding(data, "float32")
            int8_embeddings = get_embedding(data, "int8")
            int1_embeddings = get_embedding(data, "ubinary")

            print("Float32 Embedding:", float32_embeddings)
            print("Int8 Embedding:", int8_embeddings)
            print("Int1 Embedding (binary representation):", int1_embeddings)

         .. output:: 
            :language: shell
            :visible: false

            Float32 Embedding: [
               [-0.02980827  0.03841474 -0.02561123 ... -0.0532876
               -0.0335409 -0.02591543]  
               [-0.02748881  0.03717749 -0.03104552 ...  0.02413219 -0.02402252 0.02810651]
            ]
            Int8 Embedding: [
               [-128  127  127 ... -128 -128 -128] 
               [ 126 -128 -128 ...  127  126  127]
            ]
            Int1 Embedding (binary representation): [
               [ 77  30   4 131  15 123 146 ... 159 142 205  23 119 120]
               [ 79  82 208 180  45  79 209 ... 158 100 141 189 166 173]
            ]
            
   .. step:: Test the function to convert embeddings to |bson| vectors. 

      Paste and run the following code in your notebook to test the
      ``generate_bson_vector`` function.

      This code quantizes your ``float32``, ``int8``, and ``int1``
      embeddings for the strings ``foo`` and ``bar``. 

      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            from bson.binary BinaryVectorDtype

            bson_float32_embeddings = []
            bson_int8_embeddings = []
            bson_int1_embeddings = []

            for (f32_emb, int8_emb, int1_emb) in zip(float32_embeddings, int8_embeddings, int1_embeddings):
                bson_float32_embeddings.append(generate_bson_vector(f32_emb, BinaryVectorDtype.FLOAT32))
                bson_int8_embeddings.append(generate_bson_vector(int8_emb, BinaryVectorDtype.INT8))
                bson_int1_embeddings.append(generate_bson_vector(int1_emb, BinaryVectorDtype.PACKED_BIT))

            # Print the embeddings
            print(f"The converted bson_float32_new_embedding is: {bson_float32_embeddings}")
            print(f"The converted bson_int8_new_embedding is: {bson_int8_embeddings}")
            print(f"The converted bson_int1_new_embedding is: {bson_int1_embeddings}")
      
         .. output:: 
            :language: shell
            :visible: false

            The converted bson_float32_new_embedding is: [Binary(b'\'\x00x0\xf4\ ... x9bL\xd4\xbc', 9), Binary(b'\'\x007 ... \x9e?\xe6<', 9)]
            The converted bson_int8_new_embedding is: [Binary(b'\x03\x00\x80\x7f\ ... x80\x80', 9), Binary(b'\x03\x00~\x80 ... \x7f', 9)]
            The converted bson_int1_new_embedding is: [Binary(b'\x10\x00M\x1e\ ... 7wx', 9), Binary(b'\x10\x00OR\ ... \xa6\xad', 9)]
