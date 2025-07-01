from langchain_core.messages import ToolMessage

# Create a map of tool name to tool call
tools_by_name = {tool.name: tool for tool in tools}

# Define the tools node function
def tools_node(state: GraphState) -> Dict[str, List]:
    result = []
    # Get the list of tool calls from messages
    tool_calls = state["messages"][-1].tool_calls
    # Iterate through `tool_calls`
    for tool_call in tool_calls:
        # Get the tool from `tools_by_name` using the `name` attribute of the `tool_call`
        tool = tools_by_name[tool_call["name"]]
        # Invoke the `tool` using the `args` attribute of the `tool_call`
        observation = tool.invoke(tool_call["args"])
        # Append the result of executing the tool to the `result` list as a ToolMessage
        result.append(ToolMessage(content=observation, tool_call_id=tool_call["id"]))
    # Write `result` to the `messages` attribute of the graph state
    return {"messages": result}

# Add "tools" node using the `add_node` function
graph.add_node("tools", tools_node)