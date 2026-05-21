
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
    """Perform vector search on a MongoDB collection using specified index."""
    # Generate embedding for the user query
    query_embedding = get_embedding(user_query, task_prefix="query")

    if query_embedding is None or not query_embedding:
        return {
            "error": "Invalid query or embedding generation failed.",
            "execution_time_ms": None,
            "results": [],
        }

    # Define the vector search stage
    vector_search_stage = {
        "$vectorSearch": {
            "index": vector_search_index_name,
            "queryVector": query_embedding,
            "path": embedding_path,
            "limit": top_k,
        }
    }

    # Configure search precision approach
    if not use_full_precision:
        # For approximate nearest neighbor (ANN) search
        vector_search_stage["$vectorSearch"]["numCandidates"] = num_candidates
    else:
        # For exact nearest neighbor (ENN) search
        vector_search_stage["$vectorSearch"]["exact"] = True

    # Project stage to fetch desired fields and vector search score
    project_stage = {
        "$project": {
            "_id": 0,
            "title": 1,
            "text": 1,
            "wiki_id": 1,
            "url": 1,
            "score": {"$meta": "vectorSearchScore"},
        }
    }

    # Define the aggregate pipeline
    pipeline = [vector_search_stage, project_stage]

    try:
        # Execute the explain command to measure latency
        explain_result = collection.database.command(
            "explain",
            {"aggregate": collection.name, "pipeline": pipeline, "cursor": {}},
            verbosity="executionStats",
        )

        # Extract the execution time
        vector_search_explain = explain_result["stages"][0]["$vectorSearch"]
        execution_time_ms = vector_search_explain["explain"]["query"]["stats"]["context"]["millisElapsed"]

        # Execute the actual aggregate query
        results = list(collection.aggregate(pipeline))

        return {
            "results": results,
            "execution_time_ms": execution_time_ms,
        }
    except Exception as e:
        print(f"Error during vector search: {e}")
        return {
            "error": str(e),
            "execution_time_ms": None,
            "results": [],
        }
