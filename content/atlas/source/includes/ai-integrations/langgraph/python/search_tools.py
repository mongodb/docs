from langchain.agents import tool
from langchain_mongodb.retrievers.full_text_search import MongoDBAtlasFullTextSearchRetriever
from config import vector_store, collection

@tool
def plot_search(user_query: str) -> str:
    """
    Retrieve information on the movie's plot to answer a user query by using vector search.
    """
    
    retriever = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 5}  # Retrieve top 5 most similar documents
    )

    results = retriever.invoke(user_query)
   
    # Concatenate the results into a string
    context = "\n\n".join([f"{doc.metadata['title']}: {doc.page_content}" for doc in results])
    return context

@tool
def title_search(user_query: str) -> str:
    """
    Retrieve movie plot content based on the provided title by using full-text search.
    """
    
    # Initialize the retriever
    retriever = MongoDBAtlasFullTextSearchRetriever(
        collection=collection,            # MongoDB Collection
        search_field="title",             # Name of the field to search
        search_index_name="search_index", # Name of the MongoDB Search index
        top_k=1,                          # Number of top results to return       
    ) 
    results = retriever.invoke(user_query)
   
    for doc in results:
        if doc:
            return doc.metadata["fullplot"]
        else:
            return "Movie not found"

# List of search tools
SEARCH_TOOLS = [ plot_search, title_search ]
