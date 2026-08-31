from langchain_mongodb.loaders import MongoDBLoader

loader = MongoDBLoader.from_connection_string(
    connection_string="<connection-string>",  # MongoDB cluster URI
    db_name="langchain_db",  # Database that contains the collection
    collection_name="documents",  # Collection to load documents from
    filter_criteria={"category": "ai"},  # Optional document to specify a filter
    field_names=["title", "summary"],  # Optional list of fields to include
    metadata_names=["category"],  # Optional metadata fields to extract
)

docs = loader.load()
