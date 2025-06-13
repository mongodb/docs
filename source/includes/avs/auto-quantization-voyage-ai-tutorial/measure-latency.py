# Run the measurements
user_query = "How do I increase my productivity for maximum output"
top_k_values = [5, 10, 50, 100]
num_candidates_values = [25, 50, 100, 200, 500, 1000, 2000, 5000, 10000]

latency_results = []

for vector_search_index in vector_search_indices:
    latency_results.append(
        measure_latency_with_varying_topk(
            user_query,
            wiki_data_collection,
            vector_search_index_name=vector_search_index,
            use_full_precision=False,
            top_k_values=top_k_values,
            num_candidates_values=num_candidates_values,
        )
    )

# Conduct vector search operation using full precision
latency_results.append(
    measure_latency_with_varying_topk(
        user_query,
        wiki_data_collection,
        vector_search_index_name="vector_index_scalar_quantized",
        use_full_precision=True,
        top_k_values=top_k_values,
        num_candidates_values=num_candidates_values,
    )
)

# Combine all results into a single DataFrame
all_latency_results = pd.concat([pd.DataFrame(latency_results)])