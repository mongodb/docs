# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection-string>\""
#   }
# }
from langchain_core.globals import get_llm_cache


def set_basic_cache(CONNECTION_STRING):
    # :snippet-start: mongodb-cache
    from langchain_mongodb import MongoDBCache
    from langchain_core.globals import set_llm_cache

    set_llm_cache(
        MongoDBCache(
            connection_string=CONNECTION_STRING,  # MongoDB cluster URI
            database_name="langchain_db",  # Database to store the cache
            collection_name="cache",  # Collection to store the cache
        )
    )
    # :snippet-end:

    return get_llm_cache()  # :remove:


def set_semantic_cache(CONNECTION_STRING):
    # :snippet-start: semantic-cache
    from langchain_mongodb import MongoDBAtlasSemanticCache
    from langchain_core.globals import set_llm_cache
    from langchain_voyageai import VoyageAIEmbeddings

    set_llm_cache(
        MongoDBAtlasSemanticCache(
            embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model
            connection_string=CONNECTION_STRING,  # MongoDB cluster URI
            database_name="langchain_db",  # Database to store the cache
            collection_name="semantic_cache",  # Collection to store the cache
        )
    )
    # :snippet-end:

    return get_llm_cache()  # :remove:


def cache_llm_response(CONNECTION_STRING):
    """Store and look up a prompt/response pair in the cache."""  # :remove:
    from langchain_core.outputs import Generation  # :remove:

    cache = set_basic_cache(CONNECTION_STRING)  # :remove:

    prompt = "What is the capital of France?"  # :remove:
    llm_string = "test-llm"  # :remove:
    cache.update(prompt, llm_string, [Generation(text="Paris")])  # :remove:

    hit = cache.lookup(prompt, llm_string)  # :remove:
    return [generation.text for generation in hit]  # :remove:


# :replace-end:
