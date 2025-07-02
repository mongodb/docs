model_name = "<EMBEDDING-MODEL>"
output_dimension = <NUMBER-OF-DIMENSIONS>
float32_field = "<FIELD-NAME-FOR-FLOAT32-TYPE>"
int8_field = "<FIELD-NAME-FOR-INT8-TYPE>"
int1_field = "<FIELD-NAME-FOR-INT1-TYPE>"

# Process and update each document
updated_doc_count = 0  
for document in documents:  
    summary = document.get("<TEXT-FIELD-NAME>")  
    if not summary:  
        continue  
  
    # Generate embeddings for the summary field  
    float_embeddings = generate_embeddings([summary], model=model_name, dtype="float", output_dimension=output_dimension)  
    int8_embeddings = generate_embeddings([summary], model=model_name, dtype="int8", output_dimension=output_dimension)  
    ubinary_embeddings = generate_embeddings([summary], model=model_name, dtype="ubinary", output_dimension=output_dimension)  
  
    # Convert embeddings to BSON-compatible format  
    bson_float = generate_bson_vector(float_embeddings[0], BinaryVectorDtype.FLOAT32)  
    bson_int8 = generate_bson_vector(int8_embeddings[0], BinaryVectorDtype.INT8)  
    bson_ubinary = generate_bson_vector(ubinary_embeddings[0], BinaryVectorDtype.PACKED_BIT)  
  
    # Prepare the updated document  
    updated_fields = {  
        float32_field: bson_float,  
        int8_field: bson_int8,  
        int1_field: bson_ubinary,
    }  
  
    # Update the document in MongoDB  
    result = collection.update_one({"_id": document["_id"]}, {"$set": updated_fields})  
    if result.modified_count > 0:  
        updated_doc_count += 1  
  
# Print the results  
print(f"Number of documents updated: {updated_doc_count}") 