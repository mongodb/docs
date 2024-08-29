MongoClient mongoClient = MongoClients.create(settings);

MongoDatabase restaurantsDatabase = mongoClient.getDatabase("sample_restaurants");
MongoCollection<Document> restaurants = restaurantsDatabase.getCollection("restaurants");
MongoDatabase moviesDatabase = mongoClient.getDatabase("sample_mflix");
MongoCollection<Document> movies = moviesDatabase.getCollection("movies");

Mono.from(mongoClient.startSession())
        .flatMap(session -> {
            // Begins the transaction
            session.startTransaction();

            // Inserts documents in the given order
            return Mono.from(restaurants.insertOne(session, new Document("name", "Reactive Streams Pizza").append("cuisine", "Pizza")))
                    .then(Mono.from(movies.insertOne(session, new Document("title", "Java: Into the Streams").append("type", "Movie"))))
                    // Commits the transaction
                    .flatMap(result -> Mono.from(session.commitTransaction())
                            .thenReturn(result))
                    .onErrorResume(error -> Mono.from(session.abortTransaction()).then(Mono.error(error)))
                    .doFinally(signalType -> session.close());
        })
        // Closes the client after the transaction completes
        .doFinally(signalType -> mongoClient.close())
        // Prints the results of the transaction
        .subscribe(
                result -> System.out.println("Transaction succeeded"),
                error -> System.err.println("Transaction failed: " + error)
        );