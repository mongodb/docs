# Pass the same store and the session ID from the earlier run.
async for message in query(
    prompt="Suggest how to improve this codebase.",
    options=ClaudeAgentOptions(
        session_store=store,
        resume="<session-id>",
    ),
):
    if isinstance(message, ResultMessage) and message.subtype == "success":
        print(message.result)
