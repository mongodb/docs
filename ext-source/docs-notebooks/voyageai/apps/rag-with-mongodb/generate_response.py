from config import llm_client, LLM_MODEL, LLM_PROVIDER
from retrieve_data import get_query_results

def generate_response(query):
    # Retrieve relevant documents
    context_docs = get_query_results(query)

    # Convert documents to string
    context_string = " ".join([doc["text"] for doc in context_docs])

    # Construct prompt for the LLM
    prompt = f"""Use the following pieces of context to answer the question at the end.
        {context_string}
        Question: {query}
    """

    # Generate response based on LLM provider
    if LLM_PROVIDER == "anthropic":
        message = llm_client.messages.create(
            model=LLM_MODEL,
            max_tokens=1024,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        return message.content[0].text
    else:
        completion = llm_client.chat.completions.create(
            model=LLM_MODEL,
            messages=[{
                "role": "user",
                "content": prompt
            }]
        )
        return completion.choices[0].message.content

if __name__ == "__main__":
    query = "What are MongoDB's latest AI announcements?"
    response = generate_response(query)
    print(response)
