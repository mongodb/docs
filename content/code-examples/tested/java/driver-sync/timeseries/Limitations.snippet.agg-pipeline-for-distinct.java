collection.createIndex(Indexes.compoundIndex(
        Indexes.ascending("meta.project"),
        Indexes.ascending("meta.type")
));

var pipeline = Arrays.asList(
        Aggregates.match(Filters.eq("meta.project", 10)),
        Aggregates.group("$meta.type")
);
List<Document> result = collection.aggregate(pipeline).into(new ArrayList<>());
