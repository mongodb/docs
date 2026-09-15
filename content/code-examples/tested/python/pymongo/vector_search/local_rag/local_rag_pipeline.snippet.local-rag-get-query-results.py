# Function to get the results of a vector search query
def get_query_results(query):
    query_embedding = get_embedding(query)

    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "queryVector": query_embedding,
                "path": "embeddings",
                "exact": True,
                "limit": 5,
            }
        },
        {
            "$project": {
                "_id": 0,
                "summary": 1,
                "listing_url": 1,
                "score": {"$meta": "vectorSearchScore"},
            }
        },
    ]

    results = collection.aggregate(pipeline)

    array_of_results = []
    for doc in results:
        array_of_results.append(doc)
    return array_of_results

