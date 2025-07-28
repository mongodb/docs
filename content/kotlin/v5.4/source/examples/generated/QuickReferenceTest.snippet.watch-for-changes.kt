val changeStream = collection.watch()
changeStream.collect {
    println("Change to ${it.fullDocument?.title}")
}
