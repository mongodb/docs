from langchain_mongodb.retrievers.full_text_search import MongoDBAtlasFullTextSearchRetriever

# Define a full-text search tool
@tool
def full_text_search(user_query: str) -> str:
    """
    Retrieve movie plot content based on the provided title.
    """

    # Initialize the retriever
    retriever = MongoDBAtlasFullTextSearchRetriever(
       collection = collection,            # MongoDB Collection in Atlas
       search_field = "title",             # Name of the field to search
       search_index_name = "search_index", # Name of the search index
       top_k = 1,                          # Number of top results to return       
    ) 
    results = retriever.invoke(user_query)
   
    for doc in results:
      if doc:
          return doc.metadata["fullplot"]
      else:
          return "Movie not found"
  
# Test the tool     
full_text_search.invoke("What is the plot of Titanic?")