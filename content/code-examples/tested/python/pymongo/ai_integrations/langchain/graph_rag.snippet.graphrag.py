from langchain_mongodb.graphrag import MongoDBGraphStore
from langchain_openai import ChatOpenAI
from langchain_core.documents import Document

# Initialize the graph store
graph_store = MongoDBGraphStore(
    connection_string="<connection-string>",  # MongoDB cluster URI
    database_name="<database-name>",  # Database to store the graph
    collection_name="<collection-name>",  # Collection to store the graph
    entity_extraction_model=ChatOpenAI(  # LLM to extract entities
        model="gpt-4o", temperature=0
    ),
    # Other optional parameters...
)

# Add documents to the graph
docs = [
    Document(
        page_content=(
            "MongoDB is a document database. "
            "Dev Ittycheria is the CEO of MongoDB."
        )
    ),
    Document(page_content="MongoDB Atlas is the cloud platform offered by MongoDB."),
]
graph_store.add_documents(docs)

# Query the graph
query = "Who is the CEO of MongoDB?"
answer = graph_store.chat_response(query)
print(answer.content)
