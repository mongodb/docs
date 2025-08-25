val constraints: Constraints = Constraints.Builder()
    .setRequiredNetworkType(NetworkType.UNMETERED)
    .setRequiresBatteryNotLow(true)
    .build()
val backgroundRealmSync: PeriodicWorkRequest = PeriodicWorkRequest.Builder(
        RealmBackgroundWorker::class.java,
        // repeat every 12 hours
        12, TimeUnit.HOURS,
        // execute job at any point during that 12 hour period
        12, TimeUnit.HOURS
    )
    .setConstraints(constraints)
    .build()
// enqueue the work job, replacing it with the most recent version if we update it
WorkManager.getInstance(this).enqueueUniquePeriodicWork(
    RealmBackgroundWorker.UNIQUE_WORK_NAME,
    ExistingPeriodicWorkPolicy.REPLACE,
    backgroundRealmSync
)
