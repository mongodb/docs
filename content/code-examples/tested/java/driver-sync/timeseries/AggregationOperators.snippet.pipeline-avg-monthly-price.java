// Create the compound _id with $dateTrunc and symbol
Document groupId = new Document("firstDayOfMonth",
        new Document("$dateTrunc",
                new Document("date", "$date")
                        .append("unit", "month")))
        .append("symbol", "$symbol");

// Create the $group stage
Bson groupStage = Aggregates.group(
        groupId,
        Accumulators.avg("avgMonthClose", "$close")
);

// Run the aggregation
List<Document> result = stocks.aggregate(List.of(groupStage))
        .into(new ArrayList<>());
