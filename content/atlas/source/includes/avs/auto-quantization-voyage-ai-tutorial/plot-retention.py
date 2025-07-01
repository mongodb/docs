import matplotlib.pyplot as plt

# Define colors and labels for each precision type
precision_colors = {"_scalar_": "orange", "_binary_": "red", "_float32_": "green"}

if overall_recall_results:
    # Determine unique top_k values from the first result's average_retention keys
    unique_topk = sorted(list(overall_recall_results[0]["average_retention"].keys()))

    for k in unique_topk:
        plt.figure(figsize=(10, 6))
        # For each precision type, plot retention vs. number of candidates at this top_k
        for result in overall_recall_results:
            precision_name = result.get("precision_name", "unknown")
            color = precision_colors.get(precision_name, "blue")
            # Get candidate values from the average_retention dictionary for top_k k
            candidate_values = sorted(result["average_retention"][k].keys())
            retention_values = [
                result["average_retention"][k][nc] for nc in candidate_values
            ]

            plt.plot(
                candidate_values,
                retention_values,
                marker="o",
                label=precision_name.strip("_"),
                color=color,
            )

        plt.xlabel("Number of Candidates")
        plt.ylabel("Retention Score")
        plt.title(f"Retention vs Number of Candidates for Top-K = {k}")
        plt.legend()
        plt.grid(True)
        plt.show()

    # Print detailed average retention results
    print("\nDetailed Average Retention Results:")
    for result in overall_recall_results:
        precision_name = result.get("precision_name", "unknown")
        print(f"\n{precision_name} Embedding:")
        for k in sorted(result["average_retention"].keys()):
            print(f"\nTop-K: {k}")
            for nc in sorted(result["average_retention"][k].keys()):
                ret = result["average_retention"][k][nc]
                print(f"   NumCandidates: {nc}, Retention: {ret:.4f}")