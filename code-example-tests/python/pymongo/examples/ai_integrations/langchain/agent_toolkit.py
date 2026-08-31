# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection-string>\"",
#     "\"langchain_db\"": "\"<database-name>\""
#   }
# }
from examples.ai_integrations.langchain.gateway import build_chat_model  # :remove:


def query_with_agent_toolkit(CONNECTION_STRING):
    # :snippet-start: agent-toolkit
    from langchain_openai import ChatOpenAI
    from langgraph.prebuilt import create_react_agent
    from langchain_mongodb.agent_toolkit import (
        MONGODB_AGENT_SYSTEM_PROMPT,
        MongoDBDatabase,
        MongoDBDatabaseToolkit,
    )

    db_wrapper = MongoDBDatabase.from_connection_string(
        CONNECTION_STRING, database="langchain_db"
    )
    llm = build_chat_model("gpt-4o-mini", timeout=60)  # :remove:
    # :uncomment-start:
    # llm = ChatOpenAI(model="gpt-4o-mini", timeout=60)
    # :uncomment-end:
    toolkit = MongoDBDatabaseToolkit(db=db_wrapper, llm=llm)

    system_message = MONGODB_AGENT_SYSTEM_PROMPT.format(top_k=5)

    test_query = "Which country's customers spent the most?"
    agent = create_react_agent(llm, toolkit.get_tools(), prompt=system_message)
    agent.step_timeout = 60
    events = agent.stream(
        {"messages": [("user", test_query)]},
        stream_mode="values",
    )

    messages = []
    for event in events:
        messages.extend(event["messages"])
    print(messages[-1].content)
    # :snippet-end:

    return messages  # :remove:


# :replace-end:
