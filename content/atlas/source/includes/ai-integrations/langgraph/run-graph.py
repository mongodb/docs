# Stream outputs from the graph as they pass through its nodes
def execute_graph(user_input: str) -> None:
    # Add user input to the messages attribute of the graph state
    input = {"messages": [("user", user_input)]}

    # Pass input to the graph and stream the outputs
    for output in app.stream(input):
        for key, value in output.items():
            print(f"Node {key}:")
            print(value)
            
    print("\n---FINAL ANSWER---")
    print(value["messages"][-1].content)