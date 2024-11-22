// start-index-single
val index = Indexes.ascending("<field name>")
val observable = collection.createIndex(index)
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-index-single

// start-index-compound
val index = Indexes.compoundIndex(
    Indexes.descending("<field name 1>"), 
    Indexes.ascending("<field name 2>")
)
val observable = collection.createIndex(index)
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-index-compound

// start-create-multikey-index
val index = Indexes.ascending("<field name>")
val observable = collection.createIndex(index)
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-create-multikey-index

// start-create-geospatial-index
val observable = collection.createIndex(Indexes.geo2dsphere("<2d index>"))
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-create-geospatial-index

// start-drop-single-index
val observable = collection.dropIndex("<index name>")
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-drop-single-index

// start-create-search-index
val index = Document("mappings" -> Document("dynamic" -> <boolean value>))
val observable = collection.createSearchIndex("<index name>", index)
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-create-search-index


// start-list-search-indexes
val observable = collection.listSearchIndexes()
observable.subscribe(new Observer[Document] {
    override def onNext(index: Document): Unit = println(index.toJson())
    override def onError(e: Throwable): Unit = println("Error: " + e.getMessage)
    override def onComplete(): Unit = println("Completed")
})
// end-list-search-indexes

// start-update-search-indexes
val updateIndex = Document("mappings" -> Document("dynamic" -> false))
val observable = collection.updateSearchIndex("<index to update>", updateIndex)
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-update-search-indexes

// start-drop-search-index
val observable = collection.dropSearchIndex("<index name>")
Await.result(observable.toFuture(), Duration(10, TimeUnit.SECONDS))
// end-drop-search-index
