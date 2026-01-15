from config import anthropic_client, ANTHROPIC_MODEL
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

    # Call the LLM
    message = anthropic_client.messages.create(
        model=ANTHROPIC_MODEL,
        max_tokens=1024,
        messages=[{
            "role": "user",
            "content": prompt
        }]
    )

    return message.content[0].text

if __name__ == "__main__":
    query = "What are MongoDB's latest AI announcements?"
    response = generate_response(query)
    print(response)

