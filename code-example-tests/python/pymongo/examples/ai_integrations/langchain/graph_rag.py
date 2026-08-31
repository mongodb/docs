# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection-string>\"",
#     "\"langchain_db\"": "\"<database-name>\"",
#     "\"graph_store\"": "\"<collection-name>\""
#   }
# }
from examples.ai_integrations.langchain.gateway import build_chat_model  # :remove:


def query_graph_store(CONNECTION_STRING):
    # :snippet-start: graphrag
    from langchain_mongodb.graphrag import MongoDBGraphStore
    from langchain_openai import ChatOpenAI
    from langchain_core.documents import Document

    # Initialize the graph store
    graph_store = MongoDBGraphStore(
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        database_name="langchain_db",  # Database to store the graph
        collection_name="graph_store",  # Collection to store the graph
        entity_extraction_model=build_chat_model(  # :remove:
            "gpt-4o", temperature=0  # :remove:
        ),  # :remove:
        # :uncomment-start:
        # entity_extraction_model=ChatOpenAI(  # LLM to extract entities
        #     model="gpt-4o", temperature=0
        # ),
        # :uncomment-end:
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
    # :snippet-end:

    return answer.content  # :remove:


# :replace-end:
