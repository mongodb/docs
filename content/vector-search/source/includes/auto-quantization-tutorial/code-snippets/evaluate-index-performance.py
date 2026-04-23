overall_recall_results = []
top_k_values = [5, 10, 50, 100]
num_candidates_values = [25, 50, 100, 200, 500, 1000, 5000]
num_queries_to_test = 1

for vector_search_index in vector_search_indices:
    overall_recall_results.append(
        measure_representational_capacity_retention_against_float_enn(
            ground_truth_collection=wiki_annotation_data_collection,
            collection=wiki_data_collection,
            quantized_index_name=vector_search_index,
            top_k_values=top_k_values,
            num_candidates_values=num_candidates_values,
            num_queries_to_test=num_queries_to_test,
        )
    )