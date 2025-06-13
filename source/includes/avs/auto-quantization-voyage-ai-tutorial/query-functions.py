
def get_embedding(text, task_prefix="document"):
    """Fetch embedding for a given text using Voyage AI."""
    if not text.strip():
        print("Empty text provided for embedding.")
        return []
    result = voyage_client.embed([text], model="voyage-3-large", input_type=task_prefix)
    return result.embeddings[0]

def custom_vector_search(
    user_query,
    collection,
    embedding_path,
    vector_search_index_name="vector_index",
    top_k=5,
    num_candidates=25,
    use_full_precision=False,
):

    # Generate embedding for the user query
    query_embedding = get_embedding(user_query, task_prefix="query")

    if query_embedding is None:
        return "Invalid query or embedding generation failed."

    # Define the vector search stage
    vector_search_stage = {
        "$vectorSearch": {
            "index": vector_search_index_name,
            "queryVector": query_embedding,
            "path": embedding_path,
            "limit": top_k,
        }
    }

    # Add numCandidates only for approximate search
    if not use_full_precision:
        vector_search_stage["$vectorSearch"]["numCandidates"] = num_candidates
    else:
        # Set exact to true for exact search using full precision float32 vectors and running exact search
        vector_search_stage["$vectorSearch"]["exact"] = True

    project_stage = {
        "$project": {
            "_id": 0,
            "title": 1,
            "text": 1,
            "wiki_id": 1,
            "url": 1,
            "score": {
                "$meta": "vectorSearchScore"
            },
        }
    }

    # Define the aggregate pipeline with the vector search stage and additional stages
    pipeline = [vector_search_stage, project_stage]

    # Execute the explain command
    explain_result = collection.database.command(
        "explain",
        {"aggregate": collection.name, "pipeline": pipeline, "cursor": {}},
        verbosity="executionStats",
    )

    # Extract the execution time
    vector_search_explain = explain_result["stages"][0]["$vectorSearch"]
    execution_time_ms = vector_search_explain["explain"]["query"]["stats"]["context"][
        "millisElapsed"
    ]

    # Execute the actual query
    results = list(collection.aggregate(pipeline))

    return {"results": results, "execution_time_ms": execution_time_ms}