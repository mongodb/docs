from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
from langchain_mongodb.embeddings import AutoEmbeddings
from langchain_core.documents import Document

# Some documents to embed
docs = [
    Document(page_content="foo", metadata={"baz": "bar"}),
    Document(page_content="thud", metadata={"bar": "baz"}),
]

# Instantiate the vector store with Automated Embedding
vector_store = MongoDBAtlasVectorSearch.from_connection_string(
    connection_string="<connection-string>",  # MongoDB cluster URI
    namespace="<database-name>.<collection-name>",  # Database and collection name
    embedding=AutoEmbeddings(model="voyage-4"),  # Enable Automated Embedding
    index_name="vector_index",  # Name of the vector search index
    # Other optional parameters...
)

# Add documents - text is embedded server-side
vector_store.add_documents(documents=docs)

# Search - queries are embedded server-side
results = vector_store.similarity_search("search query")
