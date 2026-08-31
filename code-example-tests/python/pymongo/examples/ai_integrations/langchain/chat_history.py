# :replace-start: {
#   "terms": {
#     "CONNECTION_STRING": "\"<connection-string>\"",
#     "\"chat-session-1\"": "\"<session-id>\""
#   }
# }


def add_messages(CONNECTION_STRING):
    # :snippet-start: chat-history
    from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory

    chat_message_history = MongoDBChatMessageHistory(
        session_id="chat-session-1",  # Unique session identifier
        connection_string=CONNECTION_STRING,  # MongoDB cluster URI
        database_name="langchain_db",  # Database to store the chat history
        collection_name="chat_history",  # Collection to store the chat history
    )

    chat_message_history.add_user_message("Hello")
    chat_message_history.add_ai_message("Hi")
    # :snippet-end:

    return chat_message_history  # :remove:


def get_messages(CONNECTION_STRING):
    chat_message_history = add_messages(CONNECTION_STRING)  # :remove:

    # :snippet-start: chat-history-messages
    print(chat_message_history.messages)
    # :snippet-end:

    return chat_message_history.messages  # :remove:


# :replace-end:
