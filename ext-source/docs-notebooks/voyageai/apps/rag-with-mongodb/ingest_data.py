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
    print("Loading PDF document...")
    loader = PyPDFLoader("https://investors.mongodb.com/node/13576/pdf")
    data = loader.load()
    print(f"Loaded {len(data)} pages from PDF")

    # Split the data into chunks
    print("Splitting document into chunks...")
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=400, chunk_overlap=20)
    documents = text_splitter.split_documents(data)
    print(f"Created {len(documents)} chunks")

    # Generate embeddings and prepare documents
    print(f"Generating embeddings for {len(documents)} chunks...")
    docs_to_insert = []
    for i, doc in enumerate(documents):
        embedding = get_embedding(doc.page_content)
        if embedding:
            docs_to_insert.append({
                "text": doc.page_content,
                "embedding": embedding
            })
        # Progress indicator every 10 documents
        if (i + 1) % 10 == 0:
            print(f"  Processed {i + 1}/{len(documents)} chunks...")

    # Insert documents into the collection
    if docs_to_insert:
        print(f"Inserting {len(docs_to_insert)} documents into MongoDB...")
        collection.insert_many(docs_to_insert)
        print("Data ingestion complete!")

def create_vector_index(max_retries=60, retry_interval=5):
    """
    Create a vector search index and wait for it to become queryable.

    Args:
        max_retries: Maximum number of times to check if index is ready (default: 60)
        retry_interval: Seconds to wait between retries (default: 5)
    """
    index_name = "vector_index"

    # Check if index already exists
    existing_indexes = list(collection.list_search_indexes(index_name))
    if existing_indexes:
        if existing_indexes[0].get("queryable"):
            print("Vector index already exists and is queryable")
            return
        else:
            print("Vector index exists but is not yet queryable. Waiting...")
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
        print("Index creation initiated")

    # Wait for index to become queryable with timeout
    print("Waiting for index to become queryable...")
    predicate = lambda index: index.get("queryable") is True

    for attempt in range(max_retries):
        indices = list(collection.list_search_indexes(index_name))
        if len(indices) and predicate(indices[0]):
            print("Index is ready!")
            return

        # Progress indicator
        if (attempt + 1) % 6 == 0:  # Every 30 seconds (6 * 5s)
            print(f"  Still waiting... ({(attempt + 1) * retry_interval}s elapsed)")

        time.sleep(retry_interval)

    raise TimeoutError(f"Index did not become queryable after {max_retries * retry_interval} seconds")

if __name__ == "__main__":
    ingest_data()
    create_vector_index()
