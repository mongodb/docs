# Specify the field names for the float32, int8, and int1 embeddings
float32_field = "<FIELD-NAME-FOR-FLOAT32-TYPE>"
int8_field = "<FIELD-NAME-FOR-INT8-TYPE>"
int1_field = "<FIELD-NAME-FOR-INT1-TYPE>"

# Define function to create documents with BSON vector embeddings
def create_new_docs_with_bson_vectors(bson_float32_embeddings, bson_int8_embeddings, bson_int1_embeddings, data):
  docs = []
  for i, (bson_f32_emb, bson_int8_emb, bson_int1_emb, text) in enumerate(zip(bson_float32_embeddings, bson_int8_embeddings, bson_int1_embeddings, data)):

     doc = {
          "_id": i,
          "<TEXT-FIELD-NAME>": text,
          float32_field: bson_f32_emb,
          int8_field: bson_int8_emb,
          int1_field: bson_int1_emb
     }
     docs.append(doc)
  return docs

# Create the documents
documents = create_new_docs_with_bson_vectors(bson_float32_embeddings, bson_int8_embeddings, bson_int1_embeddings, data)