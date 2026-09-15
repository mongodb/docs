question = "Can you recommend a few AirBnBs that are beach houses? Include a link to the listing."
documents = get_query_results(question)

text_documents = ""
for doc in documents:
    summary = doc.get("summary", "")
    link = doc.get("listing_url", "")
    string = f"Summary: {summary} Link: {link}. \n"
    text_documents += string

prompt = f"""Use the following pieces of context to answer the question at the end.
    {text_documents}
    Question: {question}
"""

response = local_llm.generate(prompt)
cleaned_response = response.replace("\\n", "\n")
print(cleaned_response)
