// display the results of your operation
result.getInsertedIds().values().forEach(doc -> System.out.println(doc.asObjectId().getValue()));
