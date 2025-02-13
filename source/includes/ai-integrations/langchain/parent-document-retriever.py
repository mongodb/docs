from langchain_mongodb.retrievers import MongoDBAtlasParentDocumentRetriever
from langchain_openai import OpenAIEmbeddings

# Define the embedding model to use
embedding_model = OpenAIEmbeddings(model="text-embedding-3-small")

# Define the chunking method for the child documents
child_splitter = RecursiveCharacterTextSplitter(chunk_size=200, chunk_overlap=20)

# Specify the database and collection name
database_name = "langchain_db"
collection_name = "parent_document"

# Create the parent document retriever
parent_doc_retriever = MongoDBAtlasParentDocumentRetriever.from_connection_string(
    connection_string = ATLAS_CONNECTION_STRING,
    child_splitter = child_splitter,
    embedding_model = embedding_model,
    database_name = database_name,
    collection_name = collection_name,
    text_key = "page_content",
    relevance_score_fn = "dotProduct",
    search_kwargs = { "k": 10 },
)