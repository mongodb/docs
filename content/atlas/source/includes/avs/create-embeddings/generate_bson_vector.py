from bson.binary import Binary 
from bson.binary import BinaryVectorDtype

# Define a function to generate BSON vectors
def generate_bson_vector(vector, vector_dtype):
   return Binary.from_vector(vector, vector_dtype)

# Generate BSON vector from the sample float32 embedding
bson_float32_embedding = generate_bson_vector(embedding, BinaryVectorDtype.FLOAT32)

# Print the converted embedding
print(f"The converted BSON embedding is: {bson_float32_embedding}")