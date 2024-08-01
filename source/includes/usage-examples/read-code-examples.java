// start-find-one
FindPublisher<Document> findDocPublisher = collection
        .find(eq("<field name>", "<value>")).first();

Flux.from(findDocPublisher)
        .doOnNext(System.out::println)
        .blockLast();
// end-find-one

// start-find-multiple
FindPublisher<Document> findDocPublisher = collection
        .find(eq("<field name>", "<value>"));
        
Flux.from(findDocPublisher)
        .doOnNext(System.out::println)
        .blockLast();
// end-find-multiple

// start-count-collection
Publisher<Long> countPublisher = collection.countDocuments();

Flux.from(countPublisher)
        .doOnNext(System.out::println)
        .blockLast();
// end-count-collection

// start-count-documents
Publisher<Long> countPublisher = collection.countDocuments(
           eq("<field name>", "<value>"));

Flux.from(countPublisher)
        .doOnNext(System.out::println)
        .blockLast();
// end-count-documents

// start-estimate-count
Publisher<Long> countPublisher = collection.estimatedDocumentCount();

Flux.from(countPublisher)
        .doOnNext(System.out::println)
        .blockLast();
// end-estimate-count

// start-retrieve-distinct
DistinctPublisher<String> distinctPublisher = collection.distinct(
           "<field name>", <type>.class);

Flux.from(distinctPublisher)
        .doOnNext(System.out::println)
        .blockLast();
// end-retrieve-distinct

// start-monitor-changes
ChangeStreamPublisher<Document> changePublisher = collection.watch();

Flux.from(changePublisher)
        .doOnNext(System.out::println)
        .blockLast();
// end-monitor-changes