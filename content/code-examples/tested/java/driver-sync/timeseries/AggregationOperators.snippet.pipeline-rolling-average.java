// Create the compound _id with $dateTrunc and symbol
List<Document> pipeline = List.of(
        new Document("$setWindowFields",
                new Document("partitionBy", new Document("symbol", "$symbol"))
                        .append("sortBy", new Document("date", 1))
                        .append("output", new Document("averageMonthClosingPrice",
                                new Document("$avg", "$close")
                                        .append("window", new Document("range", Arrays.asList(-1, "current"))
                                                .append("unit", "month")))))
);

List<Document> result = stocks.aggregate(pipeline).into(new ArrayList<>());
