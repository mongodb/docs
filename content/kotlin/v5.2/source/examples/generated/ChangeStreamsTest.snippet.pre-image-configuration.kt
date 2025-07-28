val job = launch {
    val changeStream = collection.watch()
        .fullDocumentBeforeChange(FullDocumentBeforeChange.REQUIRED)
    changeStream.collect {
        println(it)
    }
}
// Perform MongoDB operations that trigger change events...

// Cancel the change stream when you're done listening for events.
job.cancel()
