# Convert the retrieved documents to a string
context_string = " ".join([doc["text"] for doc in context_docs])

# Construct prompt for the LLM using the retrieved documents as the context
prompt = f"""Use the following pieces of context to answer the question at the end.
    {context_string}
    Question: {query}
"""

openai_client = OpenAI()

# OpenAI model to use
model_name = "gpt-4o"

completion = openai_client.chat.completions.create(
    model=model_name,
    messages=[{"role": "user", "content": prompt}],
)
print(completion.choices[0].message.content)
