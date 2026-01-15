.. procedure::
   :style: normal

   .. step:: Set up the environment.

      Create an interactive Python notebook by saving a file 
      with the ``.ipynb`` extension, and then run the 
      following command in the notebook to install the dependencies:

      .. code-block:: python
         
         pip install --quiet --upgrade voyageai pymongo

   .. step:: Define and test the function to generate vector embeddings.

      .. include:: /includes/avs/extracts/avs-voyage-model-description.rst
         
      .. io-code-block:: 
         :copyable: true 

         .. input:: 
            :language: python

            import os
            import voyageai

            # Specify your Voyage API key and embedding model
            os.environ["VOYAGE_API_KEY"] = "<api-key>"
            model = "voyage-3-large"
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

            [-0.016463523730635643, -0.040630217641592026, -0.026241062209010124, -0.006248823832720518, ... -0.003811582690104842, -0.01361055113375187, 0.047476209700107574, -0.0030144075863063335]
       
      .. collapsible::
         :heading: (Advanced) Compress your embeddings.
         :sub_heading: Expand this section to define a function that converts your embeddings to BSON binary format.
         :expanded: false

         .. include:: /includes/avs/extracts/avs-bson-function-python-description.rst

         .. io-code-block:: 
            :copyable: true 

            .. input:: /includes/avs/create-embeddings/manual/generate_bson_vector.py
               :language: python
         
            .. output:: 
               :language: shell
               :visible: false

               The converted BSON embedding is: [Binary(b'\'\x00x0\xf4\ ... x9bL\xd4\xbc', 9), Binary(b'\'\x007 ... \x9e?\xe6<', 9)]
