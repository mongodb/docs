# start-insert-one
Document document = new Document("<field name>", "<value>");
Publisher<InsertOneResult> insertOnePublisher = collection.insertOne(document);
InsertOneResult result = Mono.from(insertOnePublisher).block();

System.out.printf("Inserted 1 document with ID %s.", 
      result.getInsertedId());
# end-insert-one

# start-insert-multiple
Document doc1 = new Document("<field name>", "<value>");
Document doc2 = new Document("<field name>", "<value>");

List<Document> documents = Arrays.asList(doc1, doc2);

Publisher<InsertManyResult> insertManyPublisher = collection.insertMany(documents);
InsertManyResult result = Mono.from(insertManyPublisher).block();

System.out.printf("Inserted documents with IDs %s.",
      result.getInsertedIds());
# end-insert-multiple

# start-update-one
Publisher<UpdateResult> updateOnePublisher = collection.updateOne(
      eq("<field name>", "<value>"),
      set("<field name>", "<new value>"));
UpdateResult result = Mono.from(updateOnePublisher).block();

System.out.printf("Updated %s document.",
      result.getModifiedCount());
# end-update-one

# start-update-multiple
Publisher<UpdateResult> updateManyPublisher = collection.updateMany(
        eq("<field name>", "<value>"),
        set("<field name>", "<new value>"));
UpdateResult result = Mono.from(updateManyPublisher).block();

System.out.printf("Updated %s documents.",
      result.getModifiedCount());
# end-update-multiple

# start-replace-one
Publisher<UpdateResult> replaceOnePublisher = collection.replaceOne(
        eq("<field name>", "<value>"),
        new Document().append("<field name>", "<new value>")
                .append("<new field name>", "<new value>"));
UpdateResult result = Mono.from(replaceOnePublisher).block();

System.out.printf("Replaced %s document.",
      result.getModifiedCount());
# end-replace-one

# start-delete-one
Publisher<DeleteResult> deleteOnePublisher = collection.deleteOne(
        eq("<field name>", "<value>"));
DeleteResult result = Mono.from(deleteOnePublisher).block();

System.out.printf("Deleted %s document.", result.getDeletedCount());
# end-delete-one

# start-delete-multiple
Publisher<DeleteResult> deleteManyPublisher = collection.deleteMany(
        eq("<field name>", "<value>"));
DeleteResult result = Mono.from(deleteManyPublisher).block();

System.out.printf("Deleted %s documents.", result.getDeletedCount());
# end-delete-multiple

# start-bulk-write
Publisher<BulkWriteResult> bulkWritePublisher = collection.bulkWrite(
        Arrays.asList(new InsertOneModel<>(
                        new Document("<field name>", "<value>")),
                new InsertOneModel<>(new Document("<field name>", "<value>")),
                new UpdateOneModel<>(eq("<field name>", "<value>"),
                        set("<field name>", "<new value>")),
                new DeleteOneModel<>(eq("<field name>", "<value>")),
                new ReplaceOneModel<>(eq("<field name>", "<value>"),
                        new Document("<field name>", "<new value>")
                                .append("<new field name>", "<new value>"))));
BulkWriteResult bulkResult = Mono.from(bulkWritePublisher).block();

System.out.printf("Modified %s documents and deleted %s documents.",
      bulkResult.getModifiedCount(), bulkResult.getDeletedCount());
# end-bulk-write