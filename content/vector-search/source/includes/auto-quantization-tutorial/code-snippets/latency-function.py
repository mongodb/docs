def measure_latency_with_varying_topk(
    user_query,
    collection,
    vector_search_index_name="vector_index_scalar_quantized",
    use_full_precision=False,
    top_k_values=[5, 10, 100],
    num_candidates_values=[25, 50, 100, 200, 500, 1000, 2000, 5000, 10000],
):
    results_data = []

    # Conduct vector search operation for each (top_k, num_candidates) combination
    for top_k in top_k_values:
        for num_candidates in num_candidates_values:
            # Skip scenarios where num_candidates < top_k
            if num_candidates < top_k:
                continue

            # Construct the precision name
            precision_name = vector_search_index_name.split("vector_index")[1]
            precision_name = precision_name.replace("quantized", "").capitalize()

            # If use_full_precision is true, then the precision name is "_float32_"
            if use_full_precision:
                precision_name = "_float32_ENN"

            # Perform the vector search
            vector_search_results = custom_vector_search(
                user_query=user_query,
                collection=collection,
                embedding_path="embedding",
                vector_search_index_name=vector_search_index_name,
                top_k=top_k,
                num_candidates=num_candidates,
                use_full_precision=use_full_precision,
            )

                # Extract the execution time (latency)
                latency_ms = vector_search_results["execution_time_ms"]

                # Store results
                results_data.append(
                    {
                        "precision": precision_name,
                        "top_k": top_k,
                        "num_candidates": num_candidates,
                        "latency_ms": latency_ms,
                    }
                )

    return results_data