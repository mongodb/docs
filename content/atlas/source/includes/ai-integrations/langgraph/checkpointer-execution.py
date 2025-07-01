# Update the `execute_graph` function to include the `thread_id` argument
def execute_graph(thread_id: str, user_input: str) -> None:
    config = {"configurable": {"thread_id": thread_id}}
    input = {
        "messages": [
            (
                "user",
                user_input,
            )
        ]
    }
    for output in app.stream(input, config):
        for key, value in output.items():
            print(f"Node {key}:")
            print(value)
            
    print("\n---FINAL ANSWER---")
    print(value["messages"][-1].content)