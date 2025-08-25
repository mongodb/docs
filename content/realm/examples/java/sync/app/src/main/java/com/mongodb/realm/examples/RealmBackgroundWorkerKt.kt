package com.mongodb.realm.examples
// :snippet-start: background-sync-realm
// :replace-start: {
//    "terms": {
//       "RealmBackgroundWorkerKt": "RealmBackgroundWorker"
//    }
// }
import android.annotation.SuppressLint
import android.content.Context
import android.util.Log
import androidx.concurrent.futures.ResolvableFuture
import androidx.work.ListenableWorker
import androidx.work.WorkerParameters
import com.google.common.util.concurrent.ListenableFuture
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import java.util.concurrent.TimeUnit

class RealmBackgroundWorkerKt(context: Context, workerParams: WorkerParameters) :
    ListenableWorker(context, workerParams) {
    private lateinit var future: ResolvableFuture<Result>

    @SuppressLint("RestrictedApi")
    override fun startWork(): ListenableFuture<Result> {
        future = ResolvableFuture.create()
        Realm.init(this.applicationContext)
        val appID = YOUR_APP_ID // replace this with your App ID
        val app = App(AppConfiguration.Builder(appID).build())
        val credentials = Credentials.anonymous()
        app.loginAsync(credentials) { it: App.Result<User?> ->
            if (it.isSuccess) {
                Log.v("EXAMPLE", "Successfully authenticated.")
                val user = app.currentUser()
                val config = SyncConfiguration.Builder(user, "PARTITION")
                    .build()
                Realm.getInstanceAsync(config, object : Realm.Callback() {
                    override fun onSuccess(realm: Realm) {
                        Log.v("EXAMPLE", "Successfully opened a realm for background synchronization.")
                        try {
                            app.sync.getSession(config).downloadAllServerChanges()
                            app.sync.getSession(config).uploadAllLocalChanges()
                        } catch (e: InterruptedException) {
                            e.printStackTrace()
                        }
                    }
                })
            } else {
                Log.e("EXAMPLE", "Failed login: " + it.error.errorMessage)
            }
        }
        return future
    }

    companion object {
        const val UNIQUE_WORK_NAME = "RealmBackgroundWorker"
    }
}
// :replace-end:
// :snippet-end: