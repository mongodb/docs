from langchain_mongodb import MongoDBCache
from langchain_core.globals import set_llm_cache

set_llm_cache(
    MongoDBCache(
        connection_string="<connection-string>",  # MongoDB cluster URI
        database_name="langchain_db",  # Database to store the cache
        collection_name="cache",  # Collection to store the cache
    )
)
