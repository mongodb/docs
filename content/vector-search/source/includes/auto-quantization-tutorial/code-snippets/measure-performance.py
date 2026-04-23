vector_search_indices = [
    vector_search_float32_ann_index_name,
    vector_search_scalar_quantized_index_name,
    vector_search_binary_quantized_index_name,
]

# Random query
user_query = "How do I increase my productivity for maximum output"
test_top_k = 5
test_num_candidates = 25

# Result is a list of dictionaries with the following headings: precision, top_k, latency_ms, results
results = []

for vector_search_index in vector_search_indices:
    # Conduct a vector search operation using scalar quantized
    vector_search_results = custom_vector_search(
        user_query,
        wiki_data_collection,
        embedding_path="embedding",
        vector_search_index_name=vector_search_index,
        top_k=test_top_k,
        num_candidates=test_num_candidates,
        use_full_precision=False,
    )
    # Include the precision in the results
    precision = vector_search_index.split("vector_index")[1]
    precision = precision.replace("quantized", "").capitalize()

    results.append(
        {
            "precision": precision,
            "top_k": test_top_k,
            "num_candidates": test_num_candidates,
            "latency_ms": vector_search_results["execution_time_ms"],
            "results": vector_search_results["results"][0],  # Just taking the first result, modify this to include more results if needed
        }
    )

# Conduct a vector search operation using full precision
precision = "Float32_ENN"
vector_search_results = custom_vector_search(
    user_query,
    wiki_data_collection,
    embedding_path="embedding",
    vector_search_index_name="vector_index_scalar_quantized",
    top_k=test_top_k,
    num_candidates=test_num_candidates,
    use_full_precision=True,
)

results.append(
    {
        "precision": precision,
        "top_k": test_top_k,
        "num_candidates": test_num_candidates,
        "latency_ms": vector_search_results["execution_time_ms"],
        "results": vector_search_results["results"][0],  # Just taking the first result, modify this to include more results if needed
    }
)

# Convert the results to a pandas DataFrame with the headings: precision, top_k, latency_ms
results_df = pd.DataFrame(results)
results_df.columns = ["precision", "top_k", "num_candidates", "latency_ms", "results"]

# To display the results:
results_df.head()