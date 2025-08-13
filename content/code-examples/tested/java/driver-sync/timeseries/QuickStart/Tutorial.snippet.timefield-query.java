// Initialize date range
Date startTime = Date.from(Instant.parse("2021-12-18T15:50:00Z"));
Date endTime = Date.from(Instant.parse("2021-12-18T15:56:00Z"));

// Define the query filter
Document query = new Document("$and", Arrays.asList(
        new Document("date", new Document("$gte", startTime)),
        new Document("date", new Document("$lte", endTime))
));

FindIterable<Document> metaFieldResults = stocks.find(query)
        .projection(new Document("_id", 0));

for  (Document document : metaFieldResults) {
    System.out.println(document.toJson());
}
