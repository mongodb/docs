from pymongo import MongoClient
from openai import OpenAI

from examples.vector_search.rag.get_embeddings_voyage import get_embedding

# NOTE (tests): openai is mocked via sys.modules before this module loads.   # :remove:
# pymongo.collection.Collection.aggregate is also patched in the retrieval   # :remove:
# test because $vectorSearch requires an Atlas Vector Search index that is   # :remove:
# not available on standard deployments. MongoClient is patched in the       # :remove:
# index creation test to avoid Atlas-only behaviour on non-Atlas clusters.   # :remove:
# See tests_package/vector_search/test_rag_voyage_openai.py for details.    # :remove:

# Fixture texts used in tests in place of a loaded and split PDF.           # :remove:
_SAMPLE_TEXTS = [  # :remove:
    "AI-powered applications require reliable data infrastructure.",  # :remove:
    "MongoDB Atlas Vector Search enables semantic similarity queries.",  # :remove:
    "Retrieval-augmented generation improves LLM response accuracy.",  # :remove:
    "Vector embeddings represent text as numerical arrays.",  # :remove:
    "MongoDB's document model supports AI application data patterns.",  # :remove:
]  # :remove:


def ingest_documents(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        collection = client["rag_db"]["test"]

        # :snippet-start: ingest-documents
        # Prepare documents for insertion
        docs_to_insert = [
            {
                "text": text,  # :remove:
                # :uncomment-start:
                # "text": doc.page_content,
                # :uncomment-end:
                "embedding": get_embedding(text),  # :remove:
                # :uncomment-start:
                # "embedding": get_embedding(doc.page_content),
                # :uncomment-end:
            }
            for text in _SAMPLE_TEXTS  # :remove:
            # :uncomment-start:
            # for doc in documents
            # :uncomment-end:
        ]

        result = collection.insert_many(docs_to_insert)
        # :snippet-end:

        return {"inserted_count": len(result.inserted_ids)}  # :remove:
    finally:
        client.close()


def create_search_index(CONNECTION_STRING):
    client = MongoClient(CONNECTION_STRING)
    try:
        collection = client["rag_db"]["test"]

        # :snippet-start: create-search-index
        from pymongo.operations import SearchIndexModel
        import time
        # Create your index model, then create the search index
        index_name = "vector_index"
        search_index_model = SearchIndexModel(
            definition={
                "fields": [
                    {
                        "type": "vector",
                        "numDimensions": 1024,
                        "path": "embedding",
                        "similarity": "cosine",
                    }
                ]
            },
            name=index_name,
            type="vectorSearch",
        )
        collection.create_search_index(model=search_index_model)

        # Wait for initial sync to complete
        print("Polling to check if the index is ready. This may take up to a minute.")
        predicate = None
        if predicate is None:
            predicate = lambda index: index.get("queryable") is True

        while True:
            indices = list(collection.list_search_indexes(index_name))
            if len(indices) and predicate(indices[0]):
                break
            time.sleep(5)
        print(index_name + " is ready for querying.")
        # :snippet-end:

        return index_name  # :remove:
    finally:
        client.close()


def get_query_results(CONNECTION_STRING, query):
    client = MongoClient(CONNECTION_STRING)
    try:
        collection = client["rag_db"]["test"]

        # :snippet-start: get-query-results
        # Define a function to run vector search queries
        def _run_vector_search(query):  # :remove:
        # :uncomment-start:
        # def get_query_results(query):
        # :uncomment-end:
            """Gets results from a vector search query."""

            query_embedding = get_embedding(query, input_type="query")
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


def generate_response(CONNECTION_STRING, query):
    context_docs = get_query_results(CONNECTION_STRING, query)

    # :snippet-start: generate-response
    # Convert the retrieved documents to a string
    context_string = " ".join([doc["text"] for doc in context_docs])

    # Construct prompt for the LLM using the retrieved documents as the context
    prompt = f"""Use the following pieces of context to answer the question at the end.
        {context_string}
        Question: {query}
    """

    openai_client = OpenAI()

    # OpenAI model to use
    model_name = "gpt-4o"

    completion = openai_client.chat.completions.create(
        model=model_name,
        messages=[{"role": "user", "content": prompt}],
    )
    print(completion.choices[0].message.content)
    # :snippet-end:

    return completion.choices[0].message.content  # :remove:
