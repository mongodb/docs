collections = list(database.list_collections(filter={"name": "weather24h"}))
if collections:
    collection_info = collections[0]
    options = collection_info.get("options", {})
    return options.get("expireAfterSeconds")
