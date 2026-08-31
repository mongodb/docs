from langchain_mongodb.retrievers import MongoDBAtlasParentDocumentRetriever
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_voyageai import VoyageAIEmbeddings

retriever = MongoDBAtlasParentDocumentRetriever.from_connection_string(
    connection_string="<connection-string>",  # MongoDB cluster URI
    embedding_model=VoyageAIEmbeddings(  # Embedding model to use
        model="voyage-3-large"
    ),
    child_splitter=RecursiveCharacterTextSplitter(),  # Text splitter to use
    database_name="<database-name>",  # Database to store the collection
    collection_name="<collection-name>",  # Collection to store the collection
    text_key="page_content",  # Match the key the parent document store uses
    # Additional vector store or parent class arguments...
)

# Define your query
query = "some search query"

# Print results
documents = retriever.invoke(query)
for doc in documents:
    print(doc)
