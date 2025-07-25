# start-limit-method
FindPublisher<Document> findPublisher = restaurants.find(
                eq("cuisine", "Italian")).limit(5);

Flux.from(findPublisher)
        .doOnNext(x -> System.out.println(x.getString("name")))
        .blockLast();
# end-limit-method

# start-sort-method
FindPublisher<Document> findPublisher = restaurants.find(
                eq("cuisine", "Italian")).sort(ascending("name"));

Flux.from(findPublisher)
        .doOnNext(x -> System.out.println(x.getString("name")))
        .blockLast();
# end-sort-method

# start-skip
FindPublisher<Document> findPublisher = restaurants.find(
                eq("borough", "Manhattan")).skip(10);

Flux.from(findPublisher)
        .doOnNext(x -> System.out.println(x.getString("name")))
        .blockLast();
# end-skip

# start-limit-sort-skip
FindPublisher<Document> findPublisher = restaurants.find(
                eq("cuisine", "Italian"))
        .sort(ascending("name"))
        .limit(5)
        .skip(10);

Flux.from(findPublisher)
        .doOnNext(x -> System.out.println(x.getString("name")))
        .blockLast();
# end-limit-sort-skip