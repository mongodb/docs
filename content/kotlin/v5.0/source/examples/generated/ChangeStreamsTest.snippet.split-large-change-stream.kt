val pipeline = listOf(BsonDocument().append("\$changeStreamSplitLargeEvent", BsonDocument()))

val job = launch {
    val changeStream = collection.watch(pipeline)
    changeStream.collect {
        println("Received a change event: $it")
    }
}
