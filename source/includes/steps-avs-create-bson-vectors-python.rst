.. procedure:: 
   :style: normal 

   .. step:: Install the required libraries.

      Run the following command to install the :driver:`PyMongo Driver
      </pymongo/>`.

      .. code-block:: shell 

         pip install pymongo
            
      You must install :driver:`PyMongo </pymongo/>` v4.10 or later
      driver. 

      .. example:: Install PyMongo and Cohere

         .. code-block:: shell 

            pip --quiet install pymongo cohere

   .. step:: Load the data for which you want to generate |bson| vectors in your notebook. 

      .. example:: Sample Data to Import

         .. code-block:: shell 

            data = [
               "The Great Wall of China is visible from space.",
               "The Eiffel Tower was completed in Paris in 1889.",
               "Mount Everest is the highest peak on Earth at 8,848m.",
               "Shakespeare wrote 37 plays and 154 sonnets during his lifetime.",
               "The Mona Lisa was painted by Leonardo da Vinci.",
            ]
     
   .. step:: (Conditional) Generate embeddings from your data. 
     
      This step is required if you haven't yet generated embeddings 
      from your data. If you've already generated embeddings, skip this 
      step. To learn more about generating embeddings from your data, see 
      :ref:`create-vector-embeddings`.  

      .. example:: Generate Embeddings from Sample Data Using Cohere

         .. code-block:: python 

            import cohere
            
            api_key = "{COHERE-API-KEY}"
            co = cohere.Client(api_key)

            generated_embeddings = co.embed(
               texts=data,
               model="embed-english-v3.0", 
               input_type="search_document",
               embedding_types=["float", "int8"]
            ).embeddings
            
            float32_embeddings = generated_embeddings.float
            int8_embeddings = generated_embeddings.int8

   .. step:: Generate the |bson| vectors from your embeddings.

      You can use the :driver:`PyMongo driver </pymongo/>` to convert your
      native vector embedding to |bson| vectors.
         
      .. example:: Define and Run a Function to Generate BSON Vectors

         .. code-block:: python 

            from bson.binary import Binary, BinaryVectorDtype

            def generate_bson_vector(vector, vector_dtype):
               return Binary.from_vector(vector, vector_dtype)

            # For all vectors in your collection, generate BSON vectors of float32 and int8 embeddings
            bson_float32_embeddings = []
            bson_int8_embeddings = []
            for i, (f32_emb, int8_emb) in enumerate(zip(float32_embeddings, int8_embeddings)):
               bson_float32_embeddings.append(generate_bson_vector(f32_emb, BinaryVectorDtype.FLOAT32))
               bson_int8_embeddings.append(generate_bson_vector(int8_emb, BinaryVectorDtype.INT8))
     
   .. step:: Create documents with the |bson| vector embeddings.

      If you already have the |bson| vector embeddings inside of
      documents in your collection, skip this step. 

      .. example:: Create Documents from the Sample Data
         
         .. code-block:: python 

            def create_docs_with_bson_vector_embeddings(bson_float32_embeddings, bson_int8_embeddings, data):
              docs = []
              for i, (bson_f32_emb, bson_int8_emb, text) in enumerate(zip(bson_float32_embeddings, bson_int8_embeddings, data)):

                 doc = {
                      "_id":i,
                      "data": text,
                      "{FIELD-NAME-FOR-INT8-TYPE}":bson_int8_emb,
                      "{FIELD-NAME-FOR-FLOAT32-TYPE}":bson_f32_emb,
                 }
                 docs.append(doc)
              return docs

            documents = create_docs_with_bson_vector_embeddings(bson_float32_embeddings, bson_int8_embeddings, data)

   .. step:: Load your data into your |service| {+cluster+}.

      You can load your data from the {+atlas-ui+} and programmatically. 
      To learn how to load your data from the {+atlas-ui+}, see
      :ref:`Insert Your Data <gswa-insert-data>`. The following steps
      and associated examples demonstrate how to load your data 
      programmatically by using the :driver:`PyMongo </pymongo/>`
      driver.  

      a. Connect to your |service| {+cluster+}.

         .. example:: 
         
            .. code-block:: python 

               import pymongo

               MONGO_URI = "{ATLAS-CONNECTION-STRING}"

               def get_mongo_client(mongo_uri):
                 # establish the connection

                 client = pymongo.MongoClient(mongo_uri)

               if not MONGO_URI:
                 print("MONGO_URI not set in environment variables")
     
      #. Load the data into your |service| {+cluster+}.

         .. example:: 
         
            .. code-block:: python 

               client = pymongo.MongoClient(MONGO_URI)

               db = client["{DB-NAME}"]
               db.create_collection("{COLLECTION-NAME}")
               col = db["{COLLECTION-NAME}"]

               col.insert_many(documents)
         
   .. step:: Create the {+avs+} index on the collection.

      You can create {+avs+} indexes by using the {+atlas-ui+},
      {+atlas-cli+}, {+atlas-admin-api+}, and MongoDB drivers. To learn
      more, see :ref:`avs-types-vector-search`. 

      .. example:: Create Index for the Sample Collection
         
         .. code-block:: python 

            import time
            from pymongo.operations import SearchIndexModel
  
            vector_search_index_definition = {
              "fields":[
                {
                  "type": "vector",
                  "path": "{FIELD-NAME-FOR-FLOAT32-TYPE}",
                  "similarity": "euclidean",  
                  "numDimensions": 1024,  
                },
                {
                  "type": "vector",
                  "path": "{FIELD-NAME-FOR-INT8-TYPE}",
                  "similarity": "euclidean", 
                  "numDimensions": 1024, 
                }
              ]
            }

            search_index_model = SearchIndexModel(definition=vector_search_index_definition, name="{INDEX-NAME}", type="vectorSearch")

            col.create_search_index(model=search_index_model)

   .. step:: Define a function to run the {+avs+} queries. 

      The function to run {+avs+} queries must perform the following
      actions:
      
      - Convert the query text to a |bson| vector. 
      - Define the pipeline for the {+avs+} query.

      .. example:: 
         
         .. code-block:: python 

            def run_vector_search(query_text, collection, path):
              query_text_embeddings = co.embed(
                texts=[query_text],
                model="embed-english-v3.0", 
                input_type="search_query",
                embedding_types=["float", "int8"]
              ).embeddings

              if path == "{FIELD-NAME-FOR-FLOAT32-TYPE}":
                query_vector = query_text_embeddings.float[0]
                vector_dtype = BinaryVectorDtype.FLOAT32
              else:
                query_vector = query_text_embeddings.int8[0]
                vector_dtype = BinaryVectorDtype.INT8
              bson_query_vector = generate_bson_vector(query_vector, vector_dtype)

              pipeline = [
                {
                  '$vectorSearch': {
                    'index': '{INDEX-NAME}', 
                    'path': path,
                    'queryVector': bson_query_vector,
                    'numCandidates': {NUMBER-OF-CANDIDATES-TO-CONSIDER}, 
                    'limit': {NUMBER-OF-DOCUMENTS-TO-RETURN}
                   }
                 },
                 {
                   '$project': {
                     '_id': 0,
                     'data': 1,
                     'score': { '$meta': 'vectorSearchScore' }
                    }
                 }
              ]

              return collection.aggregate(pipeline)

   .. step:: Run the {+avs+} query.

      You can run {+avs+} queries programmatically. To learn more, see
      :ref:`return-vector-search-results`. 

      .. example:: 
         
         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: python 

               from pprint import pprint

               query_text = "tell me a science fact"
               float32_results = run_vector_search(query_text, col, "{FIELD-NAME-FOR-FLOAT32-TYPE}")
               int8_results = run_vector_search(query_text, col, "{FIELD-NAME-FOR-INT8-TYPE}")

               print("results from float32 embeddings")
               pprint(list(float32_results))
               print("--------------------------------------------------------------------------")
               print("results from int8 embeddings")
               pprint(list(int8_results))

            .. output:: 
               :language: shell 

               results from float32 embeddings
               [{'data': 'Mount Everest is the highest peak on Earth at 8,848m.',
                 'score': 0.4222325384616852},
                {'data': 'The Great Wall of China is visible from space.',
                 'score': 0.4112812876701355},
                {'data': 'The Mona Lisa was painted by Leonardo da Vinci.',
                 'score': 0.3871753513813019},
                {'data': 'The Eiffel Tower was completed in Paris in 1889.',
                 'score': 0.38428616523742676},
                {'data': 'Shakespeare wrote 37 plays and 154 sonnets during his lifetime.',
                 'score': 0.37546128034591675}]
               --------------------------------------------------------------------------
               results from int8 embeddings
               [{'data': 'Mount Everest is the highest peak on Earth at 8,848m.',
                 'score': 4.619598996669083e-07},
                {'data': 'The Great Wall of China is visible from space.',
                 'score': 4.5106872903488693e-07},
                {'data': 'The Mona Lisa was painted by Leonardo da Vinci.',
                 'score': 4.0036800896814384e-07},
                {'data': 'The Eiffel Tower was completed in Paris in 1889.',
                 'score': 3.9345573554783186e-07},
                {'data': 'Shakespeare wrote 37 plays and 154 sonnets during his lifetime.',
                 'score': 3.797164538354991e-07}]
