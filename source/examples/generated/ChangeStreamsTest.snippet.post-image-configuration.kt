val job = launch {
    val changeStream = collection.watch()
        .fullDocument(FullDocument.UPDATE_LOOKUP)
    changeStream.collect {
        println(it)
    }
}

// Perform MongoDB operations that trigger change events...

// Cancel the change stream when you're done listening for events.
job.cancel()
