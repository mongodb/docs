from config import openai_client, OPENAI_MODEL
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
    completion = openai_client.chat.completions.create(
        model=OPENAI_MODEL,
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

