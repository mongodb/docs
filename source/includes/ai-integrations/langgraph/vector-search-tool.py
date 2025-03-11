from langchain.agents import tool

# Define a vector search tool
@tool
def vector_search(user_query: str) -> str:
    """
    Retrieve information using vector search to answer a user query.
    """
    
    retriever = vector_store.as_retriever(
       search_type = "similarity",
       search_kwargs = { "k": 5 } # Retrieve top 5 most similar documents
    )

    results = retriever.invoke(user_query)
   
    # Concatenate the results into a string
    context = "\n\n".join([f"{doc.metadata['title']}: {doc.page_content}" for doc in results])
    return context

# Test the tool
test_results = vector_search.invoke("What are some movies that take place in the ocean?")
print(test_results)