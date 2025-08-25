// query for the specific object you intend to listen to
val fellowshipOfTheRing = realm.query(Fellowship::class, "name == 'Fellowship of the Ring'").first().find()!!
val members = fellowshipOfTheRing.members
// flow.collect() is blocking -- run it in a background context
val job = CoroutineScope(Dispatchers.Default).launch {
    val membersFlow = members.asFlow()
    membersFlow.collect { changes: ListChange<Character> ->
        // change listener stuff in here
    }
}
job.cancel() // cancel the coroutine containing the listener
