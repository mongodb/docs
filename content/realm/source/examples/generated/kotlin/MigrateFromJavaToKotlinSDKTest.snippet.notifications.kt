// in a coroutine or a suspend function
realm.query<Sample>().asFlow().collect {
        results: ResultsChange<Sample> ->
    when (results) {
        is InitialResults<Sample> -> {
            // do nothing with the
            // initial set of results
        }
        is UpdatedResults<Sample> -> {
            // log change description
            Log.v("Results changed. " +
                "change ranges: " +
                results.changeRanges +
                ", insertion ranges: " +
                results.insertionRanges +
                ", deletion ranges: " +
                results.deletionRanges
            )
        }
    }
}
