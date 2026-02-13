// Indexes on ``timeField`` descending are more performant because they
// enable ``DISTINCT_SCAN`` optimizations.
List<String> indexes = Arrays.asList(
        collection.createIndex(Indexes.compoundIndex(
                Indexes.ascending("metadata.sensorId"),
                Indexes.ascending("timestamp"))),
        collection.createIndex(Indexes.compoundIndex(
                Indexes.ascending("metadata.sensorId"),
                Indexes.descending("timestamp"))),
        collection.createIndex(Indexes.compoundIndex(
                Indexes.descending("metadata.sensorId"),
                Indexes.ascending("timestamp"))),
        collection.createIndex(Indexes.compoundIndex(
                Indexes.descending("metadata.sensorId"),
                Indexes.descending("timestamp")))
);
