import voyageai
from bson.binary import Binary, BinaryVectorDtype

# Define a function to run a vector search query
def run_vector_search(query_text, collection, path):
    # Map path to output dtype and BSON vector type
    path_to_dtype = {
        float32_field: ("float", BinaryVectorDtype.FLOAT32),
        int8_field: ("int8", BinaryVectorDtype.INT8),
        int1_field: ("ubinary", BinaryVectorDtype.PACKED_BIT),
    }

    if path not in path_to_dtype:
        raise ValueError("Invalid path. Must be one of float32_field, int8_field, int1_field.")

    # Get Voyage AI output dtype and BSON vector type based on the path
    output_dtype, bson_dtype = path_to_dtype[path]

    # Generate query embeddings using Voyage AI
    query_vector = vo.embed(
        texts=[query_text],
        model="<EMBEDDING-MODEL>",
        input_type="query",
        output_dtype=output_dtype
    ).embeddings[0]

    # Convert the query vector to BSON format
    bson_query_vector = Binary.from_vector(query_vector, bson_dtype)

    # Define the aggregation pipeline for vector search
    pipeline = [
        {
            "$vectorSearch": {
                "index": index_name,  # Replace with your index name
                "path": path,         # Path to the embedding field
                "queryVector": bson_query_vector,  # BSON-encoded query vector
                "numCandidates": <NUMBER-OF-CANDIDATES-TO-CONSIDER>,
                "limit": <NUMBER-OF-DOCUMENTS-TO-RETURN>
            }
        },
        {
            "$project": {
                "_id": 0,
                "<TEXT-FIELD-NAME>": 1,
                "score": { "$meta": "vectorSearchScore" }  # Include the similarity score
            }
        }
    ]

    # Run the aggregation pipeline and return results
    return collection.aggregate(pipeline)