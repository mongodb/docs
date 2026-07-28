from openai import OpenAI

# Specify search query and retrieve relevant documents
query = "What are MongoDB's latest AI announcements?"
context_docs = get_query_results(query)