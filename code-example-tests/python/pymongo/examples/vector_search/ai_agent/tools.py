#   :replace-start: {
#     "terms": {
#       "examples.vector_search.ai_agent.": ""
#     }
#   }
# :snippet-start: tools
from examples.vector_search.ai_agent.config import vector_collection
from examples.vector_search.ai_agent.ingest_data import get_embedding


# Define a vector search tool
def vector_search_tool(user_input: str) -> list:
    query_embedding = get_embedding(user_input, input_type="query")
    pipeline = [
        {
            "$vectorSearch": {
                "index": "vector_index",
                "queryVector": query_embedding,
                "path": "embedding",
                "exact": True,
                "limit": 5,
            }
        },
        {"$project": {"_id": 0, "text": 1}},
    ]
    results = vector_collection.aggregate(pipeline)

    array_of_results = []
    for doc in results:
        array_of_results.append(doc)
    return array_of_results


# Define a simple calculator tool
def calculator_tool(user_input: str) -> str:
    try:
        result = eval(user_input)
        return str(result)
    except Exception as e:
        return f"Error: {str(e)}"
# :snippet-end:
#   :replace-end:
