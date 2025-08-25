// `rerunOnOpen` lets the app recalculate this query every time the app opens
val rerunOnOpenConfig =
    SyncConfiguration.Builder(user, setOf(Team::class, Task::class))
        .initialSubscriptions(rerunOnOpen = true) { realm ->
            add(
                realm.query<Team>("completed == $0", false)
            )
        }
        .build()
