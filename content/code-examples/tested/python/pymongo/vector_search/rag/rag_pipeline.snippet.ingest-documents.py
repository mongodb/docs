# Prepare documents for insertion
docs_to_insert = [
    {
        "text": doc.page_content,
        "embedding": get_embedding(doc.page_content),
    }
    for doc in documents
]

result = collection.insert_many(docs_to_insert)
