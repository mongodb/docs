// Fetch all objects of a type as a RealmResults collection, synchronously
val findAllFrogs: RealmResults<Frog> = realm.query<Frog>().find()
for(frog in findAllFrogs) {
    Log.v("Frog: $frog")
}

// Fetch all objects of a type as a Flow, asynchronously
val frogsFlow: Flow<ResultsChange<Frog>> = realm.query<Frog>().asFlow()
val asyncCall: Deferred<Unit> = async {
    frogsFlow.collect { results ->
        when (results) {
            is InitialResults<Frog> -> {
                for (frog in results.list) {
                    Log.v("Frog: $frog")
                }
            } else -> { /* no-op */ }
        }
    }
}
