from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_mongodb.agent_toolkit import (
    MONGODB_AGENT_SYSTEM_PROMPT,
    MongoDBDatabase,
    MongoDBDatabaseToolkit,
)

db_wrapper = MongoDBDatabase.from_connection_string(
    "<connection-string>", database="<database-name>"
)
llm = ChatOpenAI(model="gpt-4o-mini", timeout=60)
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
