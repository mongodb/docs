# Prepare your query
query_text = "beach house"

# Generate embedding for the search query
query_float32_embeddings = get_embedding(query_text, precision="float32")
query_int8_embeddings = get_embedding(query_text, precision="int8")
query_int1_embeddings = get_embedding(query_text, precision="ubinary")

# Convert each embedding to BSON format
query_bson_float32_embeddings = generate_bson_vector(query_float32_embeddings, BinaryVectorDtype.FLOAT32)
query_bson_int8_embeddings = generate_bson_vector(query_int8_embeddings, BinaryVectorDtype.INT8)
query_bson_int1_embeddings = generate_bson_vector(query_int1_embeddings, BinaryVectorDtype.PACKED_BIT)

# Define vector search pipeline for each precision
pipelines = []
for query_embedding, path in zip(
    [query_bson_float32_embeddings, query_bson_int8_embeddings, query_bson_int1_embeddings],
    ["BSON-Float32-Embedding", "BSON-Int8-Embedding", "BSON-Int1-Embedding"]
):
    pipeline = [
       {
          "$vectorSearch": {
                "index": "vector_index",  # Adjust if necessary
                "queryVector": query_embedding,
                "path": path,
                "exact": True,
                "limit": 5
          }
       },
       {
          "$project": {
             "_id": 0,
             "summary": 1,
             "score": {
                "$meta": "vectorSearchScore"
             }
          }
       }
    ]
    pipelines.append(pipeline)

# Execute the search for each precision
for pipeline in pipelines:
    print(f"\nResults for {pipeline[0]['$vectorSearch']['path']}:")
    results = collection.aggregate(pipeline)
    
    # Print results
    for i in results:
        print(i)
