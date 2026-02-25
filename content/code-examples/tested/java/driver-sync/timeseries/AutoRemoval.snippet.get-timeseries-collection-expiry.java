Document filter = new Document("name", "weather24h");
Document collectionInfo = database.listCollections().filter(filter).first();
if (collectionInfo != null) {
    Document options = collectionInfo.get("options", Document.class);
    if (options != null) {
        return options.getLong("expireAfterSeconds");
    }
}
