// create an aggregation pipeline
val pipeline =
    listOf(
        Document("\$project",
            Document("_id", 0)
                .append("name", 1)
                .append("storeNumber",
                    Document("\$arrayElemAt",
                        listOf(
                            Document("\$split",
                                listOf(
                                    "\$_partition",
                                    " "
                                )
                            ),
                            1
                        )
                    )
                )
        )
    )

// query mongodb using the pipeline
val aggregationTask = mongoCollection.aggregate(pipeline).iterator()

// handle success or failure of the query
aggregationTask.getAsync { task: App.Result<MongoCursor<Document>> ->
    if (task.isSuccess) {
        val results = task.get()

        // iterate over and print the results to the log
        Log.v("EXAMPLE",
            "successfully aggregated the plants. Results:")
        while (results.hasNext()) {
            Log.v("EXAMPLE", results.next().toString())
        }
    } else {
        Log.e("EXAMPLE",
            "failed to aggregate documents with: ${task.error}")
    }
}
