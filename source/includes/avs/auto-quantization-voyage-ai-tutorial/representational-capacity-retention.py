def measure_representational_capacity_retention_against_float_enn(
    ground_truth_collection,
    collection,
    quantized_index_name,  # This is used for both the quantized search and (with use_full_precision=True) for the baseline.
    top_k_values,  # List/array of top-k values to test.
    num_candidates_values,  # List/array of num_candidates values to test.
    num_queries_to_test=1,
):
retention_results = {"per_query_retention": {}}
overall_retention = {}  # overall_retention[top_k][num_candidates] = [list of retention values]

# Initialize overall retention structure
for top_k in top_k_values:
    overall_retention[top_k] = {}
    for num_candidates in num_candidates_values:
        if num_candidates < top_k:
            continue
        overall_retention[top_k][num_candidates] = []

# Extract and store the precision name from the quantized index name.
precision_name = quantized_index_name.split("vector_index")[1]
precision_name = precision_name.replace("quantized", "").capitalize()
retention_results["precision_name"] = precision_name
retention_results["top_k_values"] = top_k_values
retention_results["num_candidates_values"] = num_candidates_values

# Load ground truth annotations
ground_truth_annotations = list(
    ground_truth_collection.find().limit(num_queries_to_test)
)
print(f"Loaded {len(ground_truth_annotations)} ground truth annotations")

# Process each ground truth annotation
for annotation in ground_truth_annotations:
    # Use the ground truth wiki_id from the annotation.
    ground_truth_wiki_id = annotation["wiki_id"]

    # Process only queries that are questions.
    for query_type, queries in annotation["queries"].items():
        if query_type.lower() not in ["question", "questions"]:
            continue

        for query in queries:
            # Prepare nested dict for this query
            if query not in retention_results["per_query_retention"]:
                retention_results["per_query_retention"][query] = {}

            # For each valid combination of top_k and num_candidates
            for top_k in top_k_values:
                if top_k not in retention_results["per_query_retention"][query]:
                    retention_results["per_query_retention"][query][top_k] = {}
                for num_candidates in num_candidates_values:
                    if num_candidates < top_k:
                        continue

                    # Baseline search: full precision using ENN (Float32)
                    baseline_result = custom_vector_search(
                        user_query=query,
                        collection=collection,
                        embedding_path="embedding",
                        vector_search_index_name=quantized_index_name,
                        top_k=top_k,
                        num_candidates=num_candidates,
                        use_full_precision=True,
                    )
                    baseline_ids = {
                        res["wiki_id"] for res in baseline_result["results"]
                    }

                    # Quantized search:
                    quantized_result = custom_vector_search(
                        user_query=query,
                        collection=collection,
                        embedding_path="embedding",
                        vector_search_index_name=quantized_index_name,
                        top_k=top_k,
                        num_candidates=num_candidates,
                        use_full_precision=False,
                    )
                    quantized_ids = {
                        res["wiki_id"] for res in quantized_result["results"]
                    }

                    # Compute retention for this combination
                    if baseline_ids:
                        retention = len(
                            baseline_ids.intersection(quantized_ids)
                        ) / len(baseline_ids)
                    else:
                        retention = 0

                    # Store the results per query
                    retention_results["per_query_retention"][query].setdefault(
                        top_k, {}
                    )[num_candidates] = {
                        "ground_truth_wiki_id": ground_truth_wiki_id,
                        "baseline_ids": sorted(baseline_ids),
                        "quantized_ids": sorted(quantized_ids),
                        "retention": retention,
                    }
                    overall_retention[top_k][num_candidates].append(retention)

                    print(
                        f"Query: '{query}' | top_k: {top_k}, num_candidates: {num_candidates}"
                    )
                    print(f"  Ground Truth wiki_id: {ground_truth_wiki_id}")
                    print(f"  Baseline IDs (Float32): {sorted(baseline_ids)}")
                    print(
                        f"  Quantized IDs: {precision_name}: {sorted(quantized_ids)}"
                    )
                    print(f"  Retention: {retention:.4f}\n")

# Compute overall average retention per combination
avg_overall_retention = {}
for top_k, cand_dict in overall_retention.items():
    avg_overall_retention[top_k] = {}
    for num_candidates, retentions in cand_dict.items():
        if retentions:
            avg = sum(retentions) / len(retentions)
        else:
            avg = 0
        avg_overall_retention[top_k][num_candidates] = avg
        print(
            f"Overall Average Retention for top_k {top_k}, num_candidates {num_candidates}: {avg:.4f}"
        )

retention_results["average_retention"] = avg_overall_retention
return retention_results