from pprint import pprint

# Define a list of embedding fields to query
embedding_fields = [float32_field, int8_field, int1_field] 
results = {}

# Run vector search queries for each embedding type
query_text = "<QUERY-TEXT>"
for field in embedding_fields:
    results[field] = list(run_vector_search(query_text, collection, field)) 

# Print the results
for field, field_results in results.items():
    print(f"Results from {field}")
    pprint(field_results)