# Define a function to run vector search queries
def get_query_results(query):
    """Gets results from a vector search query."""

    pipeline = [
        {
            "$vectorSearch": {
                "index": "autoembed_index",
                "query": {"text": query},
                "path": "text",
                "exact": True,
                "limit": 5,
            }
        },
        {"$project": {"_id": 0, "text": 1}},
    ]

    results = collection.aggregate(pipeline)

    array_of_results = []
    for doc in results:
        array_of_results.append(doc)
    return array_of_results

# Test the function with a sample query
import pprint
pprint.pprint(get_query_results("AI technology"))