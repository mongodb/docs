# Use the function with different output data types to generate embeddings
model_name = "<EMBEDDING-MODEL>"
output_dimension = <NUMBER-OF-DIMENSIONS>

# Generate embeddings in all supported data types
float32_embeddings = generate_embeddings(data, model=model_name, dtype="float", output_dimension=output_dimension)
int8_embeddings = generate_embeddings(data, model=model_name, dtype="int8", output_dimension=output_dimension)
int1_embeddings = generate_embeddings(data, model=model_name, dtype="ubinary", output_dimension=output_dimension)