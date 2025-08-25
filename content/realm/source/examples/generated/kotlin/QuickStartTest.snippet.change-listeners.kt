val config = RealmConfiguration.Builder(schema = setOf(Task::class))
    .build()
val realm = Realm.open(config)

// fetch objects from a realm as Flowables
CoroutineScope(Dispatchers.Main).launch {
    val flow: Flow<ResultsChange<Task>> = realm.query<Task>().asFlow()
    flow.collect { task ->
        Log.v("Task: $task")
    }
}

// write an object to the realm in a coroutine
CoroutineScope(Dispatchers.Main).launch {
    realm.write {
        copyToRealm(Task().apply { name = "my task"; status = "Open"})
    }
}
