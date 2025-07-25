// start-open-change-stream
// Opens a change stream and prints the changes as they're received
ChangeStreamPublisher<Document> changeStreamPublisher = restaurants.watch();
Flux.from(changeStreamPublisher)
        .doOnNext(change -> System.out.println("Received change: " + change))
        .blockLast();
// end-open-change-stream

// start-change-stream-pipeline
// Creates a change stream pipeline
List<Bson> pipeline = Arrays.asList(
        Aggregates.match(Filters.eq("operationType", "update"))
);

// Opens a change stream and prints the changes as they're received
ChangeStreamPublisher<Document> changeStreamPublisher = restaurants.watch(pipeline);
Flux.from(changeStreamPublisher)
        .doOnNext(change -> System.out.println("Received change: " + change))
        .blockLast();
// end-change-stream-pipeline

// start-change-stream-post-image
// Creates a change stream pipeline
List<Bson> pipeline = Arrays.asList(
        Aggregates.match(Filters.eq("operationType", "update"))
);

// Opens a change stream and prints the changes as they're received including the full
// document after the update
ChangeStreamPublisher<Document> changeStreamPublisher = restaurants.watch(pipeline)
        .fullDocument(FullDocument.UPDATE_LOOKUP);

Flux.from(changeStreamPublisher)
        .doOnNext(change -> System.out.println("Received change: " + change))
        .blockLast();
// end-change-stream-post-image