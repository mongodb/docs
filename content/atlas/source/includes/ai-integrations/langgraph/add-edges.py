from langgraph.graph import END

# Add an edge from the START node to the `agent` node
graph.add_edge(START, "agent")

# Add an edge from the `tools` node to the `agent` node
graph.add_edge("tools", "agent")

# Define a conditional edge
def route_tools(state: GraphState):
    """
    Uses a conditional_edge to route to the tools node if the last message
    has tool calls. Otherwise, route to the end.
    """
    # Get messages from graph state
    messages = state.get("messages", [])
    if len(messages) > 0:
        # Get the last AI message from messages
        ai_message = messages[-1]
    else:
        raise ValueError(f"No messages found in input state to tool_edge: {state}")
    
    # Check if the last message has tool calls
    if hasattr(ai_message, "tool_calls") and len(ai_message.tool_calls) > 0:
        return "tools"
    return END

# Add a conditional edge from the `agent` node to the `tools` node
graph.add_conditional_edges(
    "agent",
    route_tools,
    {"tools": "tools", END: END},
)