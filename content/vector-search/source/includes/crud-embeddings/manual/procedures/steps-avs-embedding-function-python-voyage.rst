.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python
         
         pip install --quiet --upgrade voyageai pymongo

   .. step:: Define and test the function to generate vector embeddings.

      .. include:: /includes/shared/facts/mdb-vs-voyage-model-description.rst
         
      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            import os
            import voyageai

            # Specify your Voyage API key and embedding model
            os.environ["VOYAGE_API_KEY"] = "<api-key>"
            model = "voyage-4-large"
            vo = voyageai.Client()

            # Define a function to generate embeddings
            def get_embedding(data, input_type = "document"):
              embeddings = vo.embed(
                  data, model = model, input_type = input_type
              ).embeddings
              return embeddings[0]

            # Generate an embedding
            embedding = get_embedding("foo")
            print(embedding)

         .. output:: 
            :language: shell
            :visible: false

            [-0.0680396631360054, 0.03951127082109451, 0.010895480401813984, -0.041856683790683746, ... 0.0393928699195385, 0.0013418495655059814, -0.005869182292371988, -0.014275475405156612]
       
      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/crud-embeddings/manual/facts/avs-bson-function-python-description.rst

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/crud-embeddings/manual/code-snippets/python/generate_bson_vector.py
               :language: python
         
            .. output:: 
               :language: shell
               :visible: false

               The converted BSON embedding is: b'\'\x00aX\x8b\xbd\x92\xd6!=\xf5\x822<\x ... \xc0\xbb\xaf\xe3i\xbc'
