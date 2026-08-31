from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_voyageai import VoyageAIEmbeddings
from langchain_core.documents import Document
from pymongo import MongoClient

# Some documents to embed
document_1 = Document(page_content="foo", metadata={"baz": "bar"})
document_2 = Document(page_content="thud", metadata={"bar": "baz"})
docs = [document_1, document_2]

# Connect to your MongoDB cluster
client = MongoClient("<connection-string>")
collection = client["<database-name>"]["<collection-name>"]

# Create the vector store from documents
vector_store = MongoDBAtlasVectorSearch.from_documents(
    documents=docs,  # List of documents to embed
    embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
    collection=collection,  # Collection to store embeddings
    index_name="vector_index",  # Name of the vector search index
)
