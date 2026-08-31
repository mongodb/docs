from langchain_mongodb import MongoDBAtlasSemanticCache
from langchain_core.globals import set_llm_cache
from langchain_voyageai import VoyageAIEmbeddings

set_llm_cache(
    MongoDBAtlasSemanticCache(
        embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model
        connection_string="<connection-string>",  # MongoDB cluster URI
        database_name="langchain_db",  # Database to store the cache
        collection_name="semantic_cache",  # Collection to store the cache
    )
)
