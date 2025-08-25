val task = realm.where(ProjectTask::class.java)
    .equalTo("_id", ObjectId.get()).findFirst()
Log.v("EXAMPLE", "Fetched object by primary key: $task")
