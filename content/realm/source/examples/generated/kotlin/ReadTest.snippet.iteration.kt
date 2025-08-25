// Get a Flow of all frogs in the database
val allFrogsQuery = realm.query<Frog>()
val frogsFlow: Flow<ResultsChange<Frog>> = allFrogsQuery.asFlow()

// Iterate through the Flow with 'collect()'
val frogsObserver: Deferred<Unit> = async {
    frogsFlow.collect { results ->
        when (results) {
            is InitialResults<Frog> -> {
                for (frog in results.list) {
                    Log.v("Frog: $frog")
                }
            }
            else -> { /* no-op */ }
        }
    }
}

// ... Later, cancel the Flow, so you can safely close the database
frogsObserver.cancel()
realm.close()
