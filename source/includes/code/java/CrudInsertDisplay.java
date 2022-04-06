// display insert ids code goes here
List<ObjectId> insertedIds = new ArrayList<>();
result.getInsertedIds().values()
    .forEach(doc -> insertedIds.add(doc.asObjectId().getValue()));

System.out.println(insertedIds);
