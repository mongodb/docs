# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection-string>\"",
#     "\"langchain_db\"": "\"<database-name>\"",
#     "\"vector_store\"": "\"<collection-name>\"",
#     "\"parent_documents\"": "\"<collection-name>\"",
#     "\"text\"": "\"<field-name>\"",
#     "\"search_index\"": "\"<index-name>\"",
#     "\"langchain_db.vector_store\"": "\"<database-name>.<collection-name>\""
#   }
# }
from examples.ai_integrations.langchain.gateway import build_chat_model  # :remove:
from examples.ai_integrations.langchain.vector_store import (  # :remove:
    create_vector_store_from_connection_string,  # :remove:
)  # :remove:


def query_with_vector_search_retriever(CONNECTION_STRING):
    # :snippet-start: vector-search-retriever
    from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
    from langchain_voyageai import VoyageAIEmbeddings

    # Instantiate the vector store
    vector_store = MongoDBAtlasVectorSearch.from_connection_string(
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        namespace="langchain_db.vector_store",  # Database and collection name
        embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
        index_name="vector_index",  # Name of the vector search index
    )

    # Use the vector store as a retriever
    retriever = vector_store.as_retriever()

    # Define your query
    query = "some search query"

    # Print results
    documents = retriever.invoke(query)
    for doc in documents:
        print(doc)
    # :snippet-end:

    return documents  # :remove:


def query_with_full_text_retriever(CONNECTION_STRING):
    # :snippet-start: full-text-retriever
    from langchain_mongodb.retrievers.full_text_search import (
        MongoDBAtlasFullTextSearchRetriever,
    )
    from pymongo import MongoClient

    # Connect to your MongoDB cluster
    client = MongoClient(CONNECTION_STRING)
    collection = client["langchain_db"]["vector_store"]

    # Initialize the retriever
    retriever = MongoDBAtlasFullTextSearchRetriever(
        collection=collection,  # MongoDB Collection in Atlas
        search_field="text",  # Name of the field to search
        search_index_name="search_index",  # Name of the search index
    )

    # Define your query
    query = "some search query"

    # Print results
    documents = retriever.invoke(query)
    for doc in documents:
        print(doc)
    # :snippet-end:

    return documents  # :remove:


def query_with_hybrid_search_retriever(CONNECTION_STRING):
    # :snippet-start: hybrid-search-retriever
    from langchain_mongodb.retrievers.hybrid_search import (
        MongoDBAtlasHybridSearchRetriever,
    )
    from langchain_mongodb.vectorstores import MongoDBAtlasVectorSearch
    from langchain_voyageai import VoyageAIEmbeddings

    # Instantiate the vector store
    vector_store = MongoDBAtlasVectorSearch.from_connection_string(
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        namespace="langchain_db.vector_store",  # Database and collection name
        embedding=VoyageAIEmbeddings(model="voyage-3-large"),  # Embedding model to use
        index_name="vector_index",  # Name of the vector search index
    )

    # Initialize the retriever
    retriever = MongoDBAtlasHybridSearchRetriever(
        vectorstore=vector_store,  # Vector store instance
        search_index_name="search_index",  # Name of the MongoDB Search index
        top_k=5,  # Number of documents to return
        fulltext_penalty=60.0,  # Penalty for full-text search
        vector_penalty=60.0,  # Penalty for vector search
    )

    # Define your query
    query = "some search query"

    # Print results
    documents = retriever.invoke(query)
    for doc in documents:
        print(doc)
    # :snippet-end:

    return documents  # :remove:


def query_with_parent_document_retriever(CONNECTION_STRING):
    # :snippet-start: parent-document-retriever
    from langchain_mongodb.retrievers import MongoDBAtlasParentDocumentRetriever
    from langchain_text_splitters import RecursiveCharacterTextSplitter
    from langchain_voyageai import VoyageAIEmbeddings

    retriever = MongoDBAtlasParentDocumentRetriever.from_connection_string(
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        embedding_model=VoyageAIEmbeddings(  # Embedding model to use
            model="voyage-3-large"
        ),
        child_splitter=RecursiveCharacterTextSplitter(),  # Text splitter to use
        database_name="langchain_db",  # Database to store the collection
        collection_name="parent_documents",  # Collection to store the collection
        text_key="page_content",  # Match the key the parent document store uses
        # Additional vector store or parent class arguments...
    )

    # Define your query
    query = "some search query"

    # Print results
    documents = retriever.invoke(query)
    for doc in documents:
        print(doc)
    # :snippet-end:

    return documents  # :remove:


def query_with_self_query_retriever(CONNECTION_STRING):
    # :snippet-start: self-query-retriever
    from langchain_mongodb.retrievers import MongoDBAtlasSelfQueryRetriever
    from langchain_mongodb import MongoDBAtlasVectorSearch
    from langchain_classic.chains.query_constructor.schema import AttributeInfo
    from langchain_voyageai import VoyageAIEmbeddings
    from langchain_openai import ChatOpenAI

    llm = build_chat_model("gpt-4o", temperature=0)  # :remove:
    # :uncomment-start:
    # llm = ChatOpenAI(model="gpt-4o", temperature=0)
    # :uncomment-end:

    vector_store = MongoDBAtlasVectorSearch.from_connection_string(
        connection_string=CONNECTION_STRING,
        namespace="langchain_db.movies",
        embedding=VoyageAIEmbeddings(model="voyage-3-large"),
        index_name="vector_index",
    )

    # Given an existing vector store with movies data, define metadata describing the data
    metadata_field_info = [
        AttributeInfo(
            name="genre",
            description="The genre of the movie. One of ['science fiction', 'comedy', 'drama', 'thriller', 'romance', 'animated']",
            type="string",
        ),
        AttributeInfo(
            name="year",
            description="The year the movie was released",
            type="integer",
        ),
        AttributeInfo(
            name="rating", description="A 1-10 rating for the movie", type="float"
        ),
    ]

    # Create the retriever from the VectorStore, an LLM and info about the documents
    retriever = MongoDBAtlasSelfQueryRetriever.from_llm(
        llm=llm,
        vectorstore=vector_store,
        metadata_field_info=metadata_field_info,
        document_contents="Descriptions of movies",
        enable_limit=True,
    )

    # This example results in the following composite filter sent to $vectorSearch:
    # {'filter': {'$and': [{'year': {'$lt': 1960}}, {'rating': {'$gt': 8}}]}}
    documents = retriever.invoke("Movies made before 1960 that are rated higher than 8")
    print(documents)
    # :snippet-end:

    return documents  # :remove:


# :replace-end:
