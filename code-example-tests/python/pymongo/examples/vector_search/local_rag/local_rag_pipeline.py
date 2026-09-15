# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "MONGODB_URI",
#     "_LOCAL_LLM_NAME": "\"./mistral-7b-openorca.gguf2.Q4_0.gguf\""
#   }
# }
from pymongo import MongoClient

from examples.vector_search.local_rag.local_rag_embeddings import get_embedding

# The docs snippet loads the model from a file the reader downloads into their
# project directory. The tests pass the model name instead so that GPT4All
# resolves it from its local cache, downloading it on first run.
_LOCAL_LLM_NAME = "mistral-7b-openorca.gguf2.Q4_0.gguf"

_local_llm = None


def create_vector_index(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        collection = client["sample_airbnb"]["listingsAndReviews"]

        # :snippet-start: local-rag-create-index
        from pymongo.operations import SearchIndexModel

        # Create your index model, then create the search index
        search_index_model = SearchIndexModel(
            definition={
                "fields": [
                    {
                        "type": "vector",
                        "numDimensions": 1024,
                        "path": "embeddings",
                        "similarity": "cosine",
                    }
                ]
            },
            name="vector_index",
            type="vectorSearch",
        )
        collection.create_search_index(model=search_index_model)
        # :snippet-end:

        return "vector_index"  # :remove:
    finally:
        client.close()


def get_query_results(CONNECTION_STRING, query):
    client = MongoClient(CONNECTION_STRING)
    try:
        collection = client["sample_airbnb"]["listingsAndReviews"]

        # :snippet-start: local-rag-get-query-results
        # Function to get the results of a vector search query
        def _run_vector_search(query):  # :remove:
        # :uncomment-start:
        # def get_query_results(query):
        # :uncomment-end:
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

        array_of_results = _run_vector_search(query)  # :remove:
        # :snippet-end:

        return array_of_results  # :remove:
    finally:
        client.close()


def load_local_llm():
    global _local_llm

    # :snippet-start: local-rag-load-llm
    from gpt4all import GPT4All

    local_llm_path = _LOCAL_LLM_NAME
    local_llm = GPT4All(local_llm_path)
    # :snippet-end:

    _local_llm = local_llm
    return local_llm


def answer_question(CONNECTION_STRING, question):
    local_llm = _local_llm if _local_llm is not None else load_local_llm()

    # :snippet-start: local-rag-answer-question
    # :uncomment-start:
    # question = "Can you recommend a few AirBnBs that are beach houses? Include a link to the listing."
    # :uncomment-end:
    documents = get_query_results(CONNECTION_STRING, question)  # :remove:
    # :uncomment-start:
    # documents = get_query_results(question)
    # :uncomment-end:

    text_documents = ""
    for doc in documents:
        summary = doc.get("summary", "")
        link = doc.get("listing_url", "")
        string = f"Summary: {summary} Link: {link}. \n"
        text_documents += string

    prompt = f"""Use the following pieces of context to answer the question at the end.
        {text_documents}
        Question: {question}
    """

    response = local_llm.generate(prompt)
    cleaned_response = response.replace("\\n", "\n")
    print(cleaned_response)
    # :snippet-end:

    return cleaned_response  # :remove:


# :replace-end:
