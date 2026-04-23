# For all vectors in your collection, generate BSON vectors of float32, int8, and int1 embeddings
bson_float32_embeddings = []
bson_int8_embeddings = []
bson_int1_embeddings = []
for i, (f32_emb, int8_emb, int1_emb) in enumerate(zip(float32_embeddings, int8_embeddings, int1_embeddings)):
   bson_float32_embeddings.append(generate_bson_vector(f32_emb, BinaryVectorDtype.FLOAT32))
   bson_int8_embeddings.append(generate_bson_vector(int8_emb, BinaryVectorDtype.INT8))
   bson_int1_embeddings.append(generate_bson_vector(int1_emb, BinaryVectorDtype.PACKED_BIT))