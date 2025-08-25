class Book: Object {
    @Persisted var priceCents = 0
    @Persisted(indexed: true) var title = ""
}
