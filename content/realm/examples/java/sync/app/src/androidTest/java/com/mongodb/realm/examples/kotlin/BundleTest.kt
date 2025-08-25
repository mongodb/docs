package com.mongodb.realm.examples.kotlin

import android.os.Handler
import android.os.HandlerThread
import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import com.mongodb.realm.examples.model.kotlin.Frog
import io.realm.Realm
import io.realm.mongodb.App
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import java.io.File
import java.util.concurrent.TimeUnit
import org.bson.types.ObjectId
import org.junit.Test

class BundleTest : RealmTest() {
    @Test
    fun copyARealmFile() {
        val expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: copy-a-realm-file
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(appID)
            val anonymousCredentials = Credentials.anonymous()
            app.loginAsync(anonymousCredentials) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")
                    val PARTITION = "PARTITION_YOU_WANT_TO_BUNDLE"

                    // you can only create realm copies on a background thread with a looper.
                    // HandlerThread provides a Looper-equipped thread.
                    val handlerThread = HandlerThread("CopyARealmHandler")
                    handlerThread.start()
                    val handler = Handler(handlerThread.looper)
                    handler.post(Thread {
                        val config = SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            // wait for the realm to download all data from the backend before opening
                            .waitForInitialRemoteData() // :emphasize:
                            .build()

                        val realm : Realm = Realm.getInstance(config);
                        Log.v("EXAMPLE", "Successfully opened a realm.")

                        // write a copy of the realm you can manually copy to your production application assets
                        val outputDir = activity!!.applicationContext.cacheDir
                        val outputFile =
                            File(outputDir.path + "/" + PARTITION + "_bundled.realm")

                        // ensure all local changes have synced to the backend
                        try {
                            app.sync.getSession(config)
                                .uploadAllLocalChanges(10000, TimeUnit.MILLISECONDS)
                        } catch (e: InterruptedException) {
                            e.printStackTrace()
                        }

                        // cannot write to file if it already exists. Delete the file if already there
                        outputFile.delete()

                        realm.writeCopyTo(outputFile) // :emphasize:

                        // search for this log line to find the location of the realm copy
                        Log.i("EXAMPLE", "Wrote copy of realm to " + outputFile.absolutePath)

                        // always close a realm when you're done using it
                        realm.close()
                        expectation.fulfill() // :remove:
                    })
                } else {
                    Log.e("EXAMPLE", "Failed to authenticate: ${it.error}")
                }
            }
            // :snippet-end:
        }
        expectation.await();
    }

    @Test
    fun useABundledRealmFile() {
        val expectation = Expectation()
        activity?.runOnUiThread {
            // :snippet-start: use-bundled-realm-file
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(appID)
            val anonymousCredentials = Credentials.anonymous()
            app.loginAsync(anonymousCredentials) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.")

                    // asset file name should correspond to the name of the bundled file
                    val config = SyncConfiguration.Builder(
                            app.currentUser(),
                            "PARTITION_YOU_WANT_TO_BUNDLE")
                        .assetFile("example_bundled.realm") // :emphasize:
                        .build()

                    val realm: Realm = Realm.getInstance(config)
                    Log.v("EXAMPLE", "Successfully opened bundled realm.")

                    // read and write to the bundled realm as normal
                    realm.executeTransactionAsync { transactionRealm: Realm ->
                        val frog = Frog(
                            ObjectId(),
                            "Asimov",
                            4,
                            "red eyed tree frog",
                            "Spike"
                        )
                        transactionRealm.insert(frog)
                        expectation.fulfill()
                    }
                } else {
                    Log.e("EXAMPLE", "Failed to authenticate: ${it.error}")
                }
            }
            // :snippet-end:
        }
        expectation.await()
    }
}