from langchain.agents import tool
from langgraph.store.mongodb import MongoDBStore, create_vector_index_config
from config import embedding_model, MONGODB_URI

# Vector search index configuration for memory collection
index_config = create_vector_index_config(
    embed=embedding_model,
    dims=2048,
    relevance_score_fn="dotProduct",
    fields=["content"]
)

@tool
def save_memory(content: str) -> str:
    """Save important information to memory."""
    with MongoDBStore.from_conn_string(
        conn_string=MONGODB_URI,
        db_name="sample_mflix",
        collection_name="memories",
        index_config=index_config,
        auto_index_timeout=60 # Wait a minute for vector index creation
    ) as store:
        store.put(
            namespace=("user", "memories"),
            key=f"memory_{hash(content)}",
            value={"content": content}
        )
    return f"Memory saved: {content}"

@tool
def retrieve_memories(query: str) -> str:
    """Retrieve relevant memories based on a query."""
    with MongoDBStore.from_conn_string(
        conn_string=MONGODB_URI,
        db_name="sample_mflix",
        collection_name="memories",
        index_config=index_config
    ) as store:
        results = store.search(("user", "memories"), query=query, limit=3)

    if results:
        memories = [result.value["content"] for result in results]
        return f"Retrieved memories:\n" + "\n".join(memories)
    return "No relevant memories found."

MEMORY_TOOLS = [save_memory, retrieve_memories]
