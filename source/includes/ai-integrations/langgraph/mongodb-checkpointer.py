from langgraph.checkpoint.mongodb import MongoDBSaver

# Initialize a MongoDB checkpointer
checkpointer = MongoDBSaver(client)

# Instantiate the graph with the checkpointer
app = graph.compile(checkpointer=checkpointer)