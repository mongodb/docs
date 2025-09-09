import os
from langchain_openai import ChatOpenAI
from langgraph.prebuilt import create_react_agent
from langchain_mongodb.agent_toolkit import (
    MONGODB_AGENT_SYSTEM_PROMPT,
    MongoDBDatabase,
    MongoDBDatabaseToolkit,
)

MONGODB_URI = '<connection-string>'
DB_NAME = 'sample_restaurants'
NATURAL_LANGUAGE_QUERY = 'Find all restaurants that serve hamburgers.'

class NaturalLanguageToMQL:
    def __init__(self):
        self.llm = ChatOpenAI(model="gpt-4o-mini", timeout=60)
        self.system_message = MONGODB_AGENT_SYSTEM_PROMPT.format(top_k=5)
        self.db_wrapper = MongoDBDatabase.from_connection_string(
                            MONGODB_URI, 
                            database=DB_NAME)
        self.toolkit = MongoDBDatabaseToolkit(db=self.db_wrapper, llm=self.llm)
        self.agent = create_react_agent(
                        self.llm, 
                        self.toolkit.get_tools(), 
                        state_modifier=self.system_message)
        self.messages = []

    def convert_to_mql_and_execute_query(self, query):
        # Start the agent with the agent.stream() method
        events = self.agent.stream(
            {"messages": [("user", query)]},
            stream_mode="values",
        )
        # Add output (events) from the agent to the self.messages list
        for event in events:
            self.messages.extend(event["messages"])
    
    def print_results(self):
        # Print the the end-user's expected output from 
        # the final message produced by the agent.
        print(self.messages[-1].content)

def main():
    converter = NaturalLanguageToMQL()
    converter.convert_to_mql_and_execute_query(NATURAL_LANGUAGE_QUERY)
    converter.print_results()

if __name__ == '__main__':
    main()
