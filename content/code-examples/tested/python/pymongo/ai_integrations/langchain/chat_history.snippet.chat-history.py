from langchain_mongodb.chat_message_histories import MongoDBChatMessageHistory

chat_message_history = MongoDBChatMessageHistory(
    session_id="<session-id>",  # Unique session identifier
    connection_string="<connection-string>",  # MongoDB cluster URI
    database_name="langchain_db",  # Database to store the chat history
    collection_name="chat_history",  # Collection to store the chat history
)

chat_message_history.add_user_message("Hello")
chat_message_history.add_ai_message("Hi")
