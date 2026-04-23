import matplotlib.pyplot as plt

# Map your precision field to the labels and colors you want in the legend
precision_label_map = {
    "_scalar_": "scalar",
    "_binary_": "binary",
    "_float32_ann": "float32_ann",
    "_float32_ENN": "float32_ENN",
}

precision_color_map = {
    "_scalar_": "orange",
    "_binary_": "red",
    "_float32_ann": "blue",
    "_float32_ENN": "purple",
}

# Flatten all measurements and find the unique top_k values
all_measurements = [m for precision_list in latency_results for m in precision_list]
unique_topk = sorted(set(m["top_k"] for m in all_measurements))

# For each top_k, create a separate plot
for k in unique_topk:
    plt.figure(figsize=(10, 6))

    # For each precision type, filter out measurements for the current top_k value
    for measurements in latency_results:
        # Filter measurements with top_k equal to the current k
        filtered = [m for m in measurements if m["top_k"] == k]
        if not filtered:
            continue

        # Extract x (num_candidates) and y (latency) values
        x = [m["num_candidates"] for m in filtered]
        y = [m["latency_ms"] for m in filtered]

        # Determine the precision, label, and color from the first measurement in this filtered list
        precision = filtered[0]["precision"]
        label = precision_label_map.get(precision, precision)
        color = precision_color_map.get(precision, "blue")

        # Plot the line for this precision type
        plt.plot(x, y, marker="o", color=color, label=label)

    # Label axes and add title including the top_k value
    plt.xlabel("Number of Candidates")
    plt.ylabel("Latency (ms)")
    plt.title(f"Search Latency vs Num Candidates for Top-K = {k}")

    # Add a legend and grid, then show the plot
    plt.legend()
    plt.grid(True)
    plt.show()