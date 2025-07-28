val changeStream = collection.watch()
    .fullDocument(FullDocument.UPDATE_LOOKUP)
