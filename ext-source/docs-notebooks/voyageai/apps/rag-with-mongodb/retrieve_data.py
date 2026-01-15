from config import collection
from ingest_data import get_embedding

def get_query_results(query):
    # Generate query embedding
    query_embedding = get_embedding(query, input_type="query")

    # Define the aggregation pipeline
    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "queryVector": query_embedding,
                "path": "embedding",
                "exact": True,
                "limit": 5
            }
        },
        {
            "$project": {
                "_id": 0,
                "text": 1
            }
        }
    ]

    # Execute the query
    results = collection.aggregate(pipeline)

    # Convert results to array
    array_of_results = []
    for doc in results:
        array_of_results.append(doc)

    return array_of_results

if __name__ == "__main__":
    import pprint
    query = input("Enter your query: ").strip()
    results = get_query_results(query)
    pprint.pprint(results)
    