.. procedure:: 
   :style: normal 

   .. step:: Install the required libraries.

      Run the following command to install the :driver:`PyMongo Driver
      </pymongo/>`. If necessary, you can also install libraries from 
      your embedding model provider. This operation might take a few
      minutes to complete.

      ..
         NOTE: If you edit this Python code, also update the Jupyter Notebook
         at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

      .. code-block:: python 

         pip install pymongo
            
      You must install :driver:`PyMongo </pymongo/>` v4.10 or later
      driver. 

      .. example:: Install PyMongo and Cohere

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

         .. code-block:: python 

            pip install --quiet --upgrade pymongo cohere

   .. step:: Define the functions to generate vector embeddings and convert embeddings to BSON-compatible format. 

      You must define functions that perform the following by using an
      embedding model: 
      
      - Generate embeddings from your existing data if your existing
        data doesn't have any embeddings. 
      - Convert the embeddings to |bson| vectors.

      .. example:: Function to Generate and Convert Embeddings

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<COHERE-API-KEY>``
              - API key for Cohere.

         .. tabs:: 

            .. tab:: float32
               :tabid: float32

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  import os
                  import pymongo
                  import cohere
                  from bson.binary import Binary, BinaryVectorDtype

                  # Specify your Cohere API key 
                  os.environ["COHERE_API_KEY"] = "<COHERE-API-KEY>"
                  cohere_client = cohere.Client(os.environ["COHERE_API_KEY"])

                  # Define function to generate embeddings using the embed-english-v3.0 model
                  def get_embedding(text):
                      response = cohere_client.embed(
                        texts=[text],
                        model='embed-english-v3.0', 
                        input_type='search_document',
                        embedding_types=["float"]
                      )
                      embedding = response.embeddings.float[0] 
                      return embedding
                
                  # Define function to convert embeddings to BSON-compatible format
                  def generate_bson_vector(vector, vector_dtype):
                      return Binary.from_vector(vector, vector_dtype)

            .. tab:: int8
               :tabid: int8

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  import os
                  import pymongo
                  import cohere
                  from bson.binary import Binary, BinaryVectorDtype

                  # Specify your Cohere API key
                  os.environ["COHERE_API_KEY"] = "<COHERE-API-KEY>"
                  cohere_client = cohere.Client(os.environ["COHERE_API_KEY"])

                  # Define function to generate embeddings using the embed-english-v3.0 model
                  def get_embedding(text):
                      response = cohere_client.embed(
                        texts=[text],
                        model='embed-english-v3.0', 
                        input_type='search_document',
                        embedding_types=["int8"]
                      )
                      embedding = response.embeddings.int8[0] 
                      return embedding
                
                  # Define function to convert embeddings to BSON-compatible format
                  def generate_bson_vector(vector, vector_dtype):
                      return Binary.from_vector(vector, vector_dtype)

            .. tab:: int1
               :tabid: int1

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  import os
                  import pymongo
                  import cohere
                  from bson.binary import Binary, BinaryVectorDtype

                  # Specify your Cohere API key
                  os.environ["COHERE_API_KEY"] = "<COHERE-API-KEY>"
                  cohere_client = cohere.Client(os.environ["COHERE_API_KEY"])

                  # Define function to generate embeddings using the embed-english-v3.0 model
                  def get_embedding(text):
                      response = cohere_client.embed(
                        texts=[text],
                        model='embed-english-v3.0', 
                        input_type='search_document',
                        embedding_types=["ubinary"]
                      )
                      embedding = response.embeddings.ubinary[0] 
                      return embedding
                
                  # Define function to convert embeddings to BSON-compatible format
                  def generate_bson_vector(vector, vector_dtype):
                      return Binary.from_vector(vector, vector_dtype)

   .. step:: Connect to the |service| {+cluster+} and retrieve existing data. 

      You must provide the following: 
      
      - Connection string to connect to your |service| {+cluster+} that
        contains the database and collection for which you want to
        generate embeddings.
      - Name of the database that contains the collection for which you
        want to generate embeddings.
      - Name of the collection for which you want to generate embeddings.

      .. example:: Connect to |service| {+Cluster+} for Accessing Data

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<ATLAS-CONNECTION-STRING>``
              - |service| connection string. To learn more, see
                :ref:`connect-via-driver`. 

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

         .. code-block:: python 
            :linenos:

            # Connect to your Atlas cluster
            mongo_client = pymongo.MongoClient("<ATLAS-CONNECTION-STRING>")
            db = mongo_client["sample_airbnb"]
            collection = db["listingsAndReviews"]

            # Filter to exclude null or empty summary fields
            filter = { "summary": {"$nin": [None, ""]} }

            # Get a subset of documents in the collection
            documents = collection.find(filter).limit(50)

            # Initialize the count of updated documents
            updated_doc_count = 0

   .. step:: Generate, convert, and load embeddings into your collection. 
     
      a. Generate embeddings from your data using any embedding 
         model if your data doesn't already have embeddings. To learn 
         more about generating embeddings from your data, see 
         :ref:`create-vector-embeddings`. 
      #. Convert the embeddings to |bson| vectors (as shown 
         on line 7 in the following example). 
      #. Upload the embeddings to your collection on the
         |service| {+cluster+}.

      These operation might take a few minutes to complete.
 
      .. example:: Generate, Convert, and Load Embeddings to Collection

         .. tabs:: 
            :hidden:

            .. tab:: float32
               :tabid: float32

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  for doc in documents:
                      # Generate embeddings based on the summary
                      summary = doc["summary"]
                      embedding = get_embedding(summary)  # Get float32 embedding

                      # Convert the float32 embedding to BSON format
                      bson_float32 = generate_bson_vector(embedding, BinaryVectorDtype.FLOAT32)

                      # Update the document with the BSON embedding
                      collection.update_one(
                          {"_id": doc["_id"]},
                          {"$set": {"embedding": bson_float32}}
                      )
                      updated_doc_count += 1

                  print(f"Updated {updated_doc_count} documents with BSON embeddings.")

            .. tab:: int8
               :tabid: int8

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  for doc in documents:
                      # Generate embeddings based on the summary
                      summary = doc["summary"]
                      embedding = get_embedding(summary)  # Get int8 embedding

                      # Convert the int8 embedding to BSON format
                      bson_int8 = generate_bson_vector(embedding, BinaryVectorDtype.INT8)

                      # Update the document with the BSON embedding
                      collection.update_one(
                          {"_id": doc["_id"]},
                          {"$set": {"embedding": bson_int8}}
                      )
                      updated_doc_count += 1

                  print(f"Updated {updated_doc_count} documents with BSON embeddings.")

            .. tab:: int1
               :tabid: int1

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  for doc in documents:
                      # Generate embeddings based on the summary
                      summary = doc["summary"]
                      embedding = get_embedding(summary)  # Get int1 embedding

                      # Convert the int1 embedding to BSON format
                      bson_int1 = generate_bson_vector(embedding, BinaryVectorDtype.PACKED_BIT)

                      # Update the document with the BSON embedding
                      collection.update_one(
                          {"_id": doc["_id"]},
                          {"$set": {"embedding": bson_int1}}
                      )
                      updated_doc_count += 1

                  print(f"Updated {updated_doc_count} documents with BSON embeddings.")

   .. step:: Create the {+avs+} index on the collection.

      You can create {+avs+} indexes by using the {+atlas-ui+},
      {+atlas-cli+}, {+atlas-admin-api+}, and MongoDB drivers in your
      preferred language. To learn more, see
      :ref:`avs-types-vector-search`. 

      .. example:: Create Index for the Collection

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<INDEX-NAME>``
              - Name of ``vector`` type index. 

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

         .. code-block:: python 
            :linenos:

            from pymongo.operations import SearchIndexModel
            import time

            # Define and create the vector search index
            index_name = "<INDEX-NAME>"
            search_index_model = SearchIndexModel(
              definition={
                "fields": [
                  {
                    "type": "vector",
                    "path": "embedding",
                    "similarity": "euclidean",
                    "numDimensions": 1024
                  }
                ]
              },
              name=index_name,
              type="vectorSearch"
            )
            result = collection.create_search_index(model=search_index_model)
            print("New search index named " + result + " is building.")

            # Wait for initial sync to complete
            print("Polling to check if the index is ready. This may take up to a minute.")
            predicate=None
            if predicate is None:
              predicate = lambda index: index.get("queryable") is True
            while True:
              indices = list(collection.list_search_indexes(index_name))
              if len(indices) and predicate(indices[0]):
                break
              time.sleep(5)
            print(result + " is ready for querying.")

      .. include:: /includes/search-shared/fact-index-build-initial-sync.rst 

   .. step:: Define a function to run the {+avs+} queries. 

      The function to run {+avs+} queries must perform the following
      actions:
      
      - Generate embeddings for the query text.
      - Convert the query text to a |bson| vector. 
      - Define the pipeline for the {+avs+} query.

      .. example:: Function to Run {+avs+} Query

         .. list-table:: 
            :widths: 30 70 
            :header-rows: 1

            * - Placeholder 
              - Valid Value 

            * - ``<NUMBER-OF-CANDIDATES-TO-CONSIDER>`` 
              - Number of nearest neighbors to use during the search.

            * - ``<NUMBER-OF-DOCUMENTS-TO-RETURN>`` 
              - Number of documents to return in the results.

         .. tabs:: 
            :hidden:

            .. tab:: float32
               :tabid: float32

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  def run_vector_search(query_text, collection, path):
                    query_embedding = get_embedding(query_text)
                    bson_query_vector = generate_bson_vector(query_embedding, BinaryVectorDtype.FLOAT32)

                    pipeline = [
                      {
                        '$vectorSearch': {
                          'index': index_name, 
                          'path': path,
                          'queryVector': bson_query_vector,
                          'numCandidates': <NUMBER-OF-CANDIDATES-TO-CONSIDER>, # for example, 20
                          'limit': <NUMBER-OF-DOCUMENTS-TO-RETURN> # for example, 5
                         }
                       },
                       {
                         '$project': {
                           '_id': 0,
                           'name': 1,
                           'summary': 1,
                           'score': { '$meta': 'vectorSearchScore' }
                          }
                       }
                    ]

                    return collection.aggregate(pipeline)

            .. tab:: int8
               :tabid: int8

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  def run_vector_search(query_text, collection, path):
                    query_embedding = get_embedding(query_text)
                    bson_query_vector = generate_bson_vector(query_embedding, BinaryVectorDtype.INT8)

                    pipeline = [
                      {
                        '$vectorSearch': {
                          'index': index_name, 
                          'path': path,
                          'queryVector': bson_query_vector,
                          'numCandidates': <NUMBER-OF-CANDIDATES-TO-CONSIDER>, # for example, 20
                          'limit': <NUMBER-OF-DOCUMENTS-TO-RETURN> # for example, 5
                         }
                       },
                       {
                         '$project': {
                           '_id': 0,
                           'name': 1,
                           'summary': 1,
                           'score': { '$meta': 'vectorSearchScore' }
                          }
                       }
                    ]

                    return collection.aggregate(pipeline)

            .. tab:: int1
               :tabid: int1

               ..
                  NOTE: If you edit this Python code, also update the Jupyter Notebook
                  at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb

               .. code-block:: python 
   
                  def run_vector_search(query_text, collection, path):
                    query_embedding = get_embedding(query_text)
                    bson_query_vector = generate_bson_vector(query_embedding, BinaryVectorDtype.PACKED_BIT)

                    pipeline = [
                      {
                        '$vectorSearch': {
                          'index': index_name, 
                          'path': path,
                          'queryVector': bson_query_vector,
                          'numCandidates': <NUMBER-OF-CANDIDATES-TO-CONSIDER>, # for example, 20
                          'limit': <NUMBER-OF-DOCUMENTS-TO-RETURN> # for example, 5
                         }
                       },
                       {
                         '$project': {
                           '_id': 0,
                           'name': 1,
                           'summary': 1,
                           'score': { '$meta': 'vectorSearchScore' }
                          }
                       }
                    ]

                    return collection.aggregate(pipeline)

   .. step:: Run the {+avs+} query.

      You can run {+avs+} queries programmatically. To learn more, see
      :ref:`return-vector-search-results`. 

      .. example:: Run a Sample {+avs+} Query

         ..
            NOTE: If you edit this Python code, also update the Jupyter Notebook
            at https://github.com/mongodb/docs-notebooks/blob/main/quantization/existing-data.ipynb
         
         .. io-code-block:: 
            :copyable: true 
            
            .. input:: 
               :language: python 

               from pprint import pprint

               query_text = "ocean view"
               query_results = run_vector_search(query_text, collection, "embedding")

               print("query results:")
               pprint(list(query_results))

            .. output:: 
               :language: python 
               :visible: false

               query results:
               [{'name': 'Your spot in Copacabana',
                 'score': 0.5468248128890991,
                 'summary': 'Having a large airy living room. The apartment is well divided. '
                            'Fully furnished and cozy. The building has a 24h doorman and '
                            'camera services in the corridors. It is very well located, close '
                            'to the beach, restaurants, pubs and several shops and '
                            'supermarkets. And it offers a good mobility being close to the '
                            'subway.'},
                {'name': 'Twin Bed room+MTR Mongkok shopping&My',
                 'score': 0.527062714099884,
                 'summary': 'Dining shopping conveniently located Mongkok subway E1, airport '
                            'shuttle bus stops A21. Three live two beds, separate WC, 24-hour '
                            'hot water. Free WIFI.'},
               {'name': 'Quarto inteiro na Tijuca',
                 'score': 0.5222363471984863,
                 'summary': 'O quarto disponível tem uma cama de solteiro, sofá e computador '
                            'tipo desktop para acomodação.'},
                {'name': 'Makaha Valley Paradise with OceanView',
                 'score': 0.5175154805183411,
                 'summary': 'A beautiful and comfortable 1 Bedroom Air Conditioned Condo in '
                            'Makaha Valley - stunning Ocean & Mountain views All the '
                            'amenities of home, suited for longer stays. Full kitchen & large '
                            "bathroom.  Several gas BBQ's for all guests to use & a large "
                            'heated pool surrounded by reclining chairs to sunbathe.  The '
                            'Ocean you see in the pictures is not even a mile away, known as '
                            'the famous Makaha Surfing Beach. Golfing, hiking,snorkeling  '
                            'paddle boarding, surfing are all just minutes from the front '
                            'door.'},
                {'name': 'Cozy double bed room 東涌鄉村雅緻雙人房',
                 'score': 0.5149975419044495,
                 'summary': 'A comfortable double bed room at G/F. Independent entrance. High '
                            'privacy. The room size is around 100 sq.ft. with a 48"x72" '
                            'double bed. The village house is close to the Hong Kong Airport, '
                            'AsiaWorld-Expo, HongKong-Zhuhai-Macau Bridge, Disneyland, '
                            'Citygate outlets, 360 Cable car, shopping centre, main tourist '
                            'attractions......'}]

         Your results might vary depending on the vector data type 
         that you specified in the previous steps.
