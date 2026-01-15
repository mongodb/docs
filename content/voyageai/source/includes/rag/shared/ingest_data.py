from config import collection, voyage_client, VOYAGE_MODEL
from pymongo.operations import SearchIndexModel
from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter

import time

def get_embedding(data, input_type = "document"):
  embeddings = voyage_client.embed(
      data, model = VOYAGE_MODEL, input_type = input_type
  ).embeddings
  return embeddings[0]

def ingest_data():
    # Load the PDF
    loader = PyPDFLoader("https://investors.mongodb.com/node/13576/pdf")
    data = loader.load()

    # Split the data into chunks
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=20)
    documents = text_splitter.split_documents(data)

    # Generate embeddings and prepare documents
    docs_to_insert = []
    for doc in documents:
        embedding = get_embedding(doc.page_content)
        if embedding:
            docs_to_insert.append({
                "text": doc.page_content,
                "embedding": embedding
            })

    # Insert documents into the collection
    if docs_to_insert:
        collection.insert_many(docs_to_insert)

def create_vector_index():
    index_name = "vector_index"

    # Check if index already exists
    existing_indexes = list(collection.list_search_indexes(index_name))
    if existing_indexes:
        if existing_indexes[0].get("queryable"):
            return
    else:
        # Create the search index
        print("Creating vector search index...")
        search_index_model = SearchIndexModel(
            definition = {
                "fields": [
                    {
                        "type": "vector",
                        "numDimensions": 1024,
                        "path": "embedding",
                        "similarity": "dotProduct"
                    }
                ]
            },
            name=index_name,
            type="vectorSearch"
        )

        collection.create_search_index(model=search_index_model)

    # Wait for index to become queryable
    predicate = lambda index: index.get("queryable") is True

    while True:
        indices = list(collection.list_search_indexes(index_name))
        if len(indices) and predicate(indices[0]):
            break
        time.sleep(5)

if __name__ == "__main__":
    ingest_data()
    create_vector_index()

