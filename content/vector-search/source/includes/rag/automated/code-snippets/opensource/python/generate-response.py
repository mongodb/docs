from huggingface_hub import InferenceClient

# Specify search query, retrieve relevant documents, and convert to string
query = "What are MongoDB's latest AI announcements?"
context_docs = get_query_results(query)
context_string = " ".join([doc["text"] for doc in context_docs])

# Construct prompt for the LLM using the retrieved documents as the context
prompt = f"""Use the following pieces of context to answer the question at the end.
    {context_string}
    Question: {query}
"""

# Use a model from Hugging Face
llm = InferenceClient(
    "openai/gpt-oss-120b",
    provider = "fireworks-ai",
    token = os.getenv("HF_TOKEN"))

# Prompt the LLM (this code varies depending on the model you use)
output = llm.chat_completion(
    messages=[{"role": "user", "content": prompt}],
    max_tokens=150
)
print(output.choices[0].message.content)