var matchFilter = Filters.gte("timestamp",
        Date.from(Instant.parse("2022-01-15T00:00:00Z")));

var pipeline = Arrays.asList(
        new Document("$match", new Document("timestamp",
                new Document("$gte", Date.from(Instant.parse("2022-01-15T00:00:00Z"))))),
        new Document("$sort", new Document("timestamp", 1))
);

List<Document> result = collection.aggregate(pipeline).into(new ArrayList<>());
