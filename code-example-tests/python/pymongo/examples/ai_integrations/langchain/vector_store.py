# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection-string>\"",
#     "\"langchain_db.vector_store\"": "\"<database-name>.<collection-name>\"",
#     "\"langchain_db\"": "\"<database-name>\"",
#     "\"vector_store\"": "\"<collection-name>\""
#   }
# }


def create_vector_store_from_connection_string(CONNECTION_STRING):
    # :snippet-start: vector-store-connection-string
    from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
    from langchain_voyageai import VoyageAIEmbeddings

    # Instantiate the vector store using your MongoDB connection string
    vector_store = MongoDBAtlasVectorSearch.from_connection_string(
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        namespace="langchain_db.vector_store",  # Database and collection name
        embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
        index_name="vector_index",  # Name of the vector search index
        # Other optional parameters...
    )
    # :snippet-end:

    return vector_store  # :remove:


def create_vector_store_with_auto_embedding(CONNECTION_STRING):
    # :snippet-start: vector-store-auto-embedding
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
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        namespace="langchain_db.vector_store",  # Database and collection name
        embedding=AutoEmbeddings(model="voyage-4"),  # Enable Automated Embedding
        index_name="vector_index",  # Name of the vector search index
        # Other optional parameters...
    )

    # Add documents - text is embedded server-side
    vector_store.add_documents(documents=docs)

    # Search - queries are embedded server-side
    results = vector_store.similarity_search("search query")
    # :snippet-end:

    return results  # :remove:


def create_vector_store_from_client(CONNECTION_STRING):
    # :snippet-start: vector-store-client
    from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
    from langchain_voyageai import VoyageAIEmbeddings
    from pymongo import MongoClient

    # Connect to your MongoDB cluster
    client = MongoClient(CONNECTION_STRING)
    collection = client["langchain_db"]["vector_store"]

    # Instantiate the vector store
    vector_store = MongoDBAtlasVectorSearch(
        collection=collection,  # Collection to store embeddings
        embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
        index_name="vector_index",  # Name of the vector search index
        # Other optional parameters...
    )
    # :snippet-end:

    return vector_store  # :remove:


def create_vector_store_from_documents(CONNECTION_STRING):
    # :snippet-start: vector-store-from-documents
    from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
    from langchain_voyageai import VoyageAIEmbeddings
    from langchain_core.documents import Document
    from pymongo import MongoClient

    # Some documents to embed
    document_1 = Document(page_content="foo", metadata={"baz": "bar"})
    document_2 = Document(page_content="thud", metadata={"bar": "baz"})
    docs = [document_1, document_2]

    # Connect to your MongoDB cluster
    client = MongoClient(CONNECTION_STRING)
    collection = client["langchain_db"]["vector_store"]

    # Create the vector store from documents
    vector_store = MongoDBAtlasVectorSearch.from_documents(
        documents=docs,  # List of documents to embed
        embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
        collection=collection,  # Collection to store embeddings
        index_name="vector_index",  # Name of the vector search index
    )
    # :snippet-end:

    return vector_store  # :remove:


# :replace-end:
