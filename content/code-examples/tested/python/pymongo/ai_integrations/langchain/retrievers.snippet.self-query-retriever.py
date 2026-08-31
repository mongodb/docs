from langchain_mongodb.retrievers import MongoDBAtlasSelfQueryRetriever
from langchain_mongodb import MongoDBAtlasVectorSearch
from langchain_classic.chains.query_constructor.schema import AttributeInfo
from langchain_voyageai import VoyageAIEmbeddings
from langchain_openai import ChatOpenAI

llm = ChatOpenAI(model="gpt-4o", temperature=0)

vector_store = MongoDBAtlasVectorSearch.from_connection_string(
    connection_string="<connection-string>",
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
