from typing import Annotated
from typing_extensions import TypedDict
from langgraph.graph import StateGraph, START
from langgraph.graph.message import add_messages

# Define the graph state
class GraphState(TypedDict):
    messages: Annotated[list, add_messages]

# Instantiate the graph
graph = StateGraph(GraphState)
