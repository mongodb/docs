from huggingface_hub import InferenceClient
import os
# Convert the retrieved documents to a string
context_string = " ".join([doc["text"] for doc in context_docs])

# Construct prompt for the LLM using the retrieved documents as the context
prompt = f"""Use the following pieces of context to answer the question at the end.
    {context_string}
    Question: {query}
"""

# Use a model from Hugging Face
llm = InferenceClient(
    "mistralai/Mixtral-8x22B-Instruct-v0.1",
    provider="fireworks-ai",
    token=os.getenv("HF_TOKEN"),
)

# Prompt the LLM (this code varies depending on the model you use)
output = llm.chat_completion(
    messages=[{"role": "user", "content": prompt}], max_tokens=150
)
print(output.choices[0].message.content)
