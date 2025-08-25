package com.mongodb.realm.examples.kotlin

import android.util.Log
import com.mongodb.realm.examples.Expectation
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.YOUR_APP_ID
import io.realm.Realm
import io.realm.annotations.RealmModule
import io.realm.mongodb.App
import io.realm.mongodb.AppConfiguration
import io.realm.mongodb.Credentials
import io.realm.mongodb.User
import io.realm.mongodb.sync.SyncConfiguration
import org.junit.Test

class RealmsTest : RealmTest() {
    @Test
    fun realmModules() {
        val expectation = Expectation()
        activity!!.runOnUiThread {
            val appID: String = YOUR_APP_ID // replace this with your App ID
            val app = App(AppConfiguration.Builder(appID).build())
            val LIBRARY_PARTITION = "library_example"
            val PARTITION = "example"
            val credentials = Credentials.anonymous()
            app.loginAsync(
                credentials
            ) { it: App.Result<User?> ->
                if (it.isSuccess) {
                    /*
                    // :snippet-start: modules
                    // A library must create a module and set library = true. This will prevent the default
                    // module from being created.
                    // allClasses = true can be used instead of listing all classes in the library.
                    @RealmModule(library = true, allClasses = true)
                    class MyLibraryModule

                    // ...

                    // Library projects are therefore required to explicitly set their own module.
                    val libraryConfig =
                        SyncConfiguration.Builder(app.currentUser(), LIBRARY_PARTITION)
                            .modules(MyLibraryModule())
                            .build()

                    // Apps can add the library RealmModule to their own schema.
                    val config =
                        SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .modules(Realm.getDefaultModule(), MyLibraryModule())
                            .build()
                    // :snippet-end:
                    */
                    expectation.fulfill()
                    /* TODO: get these configurations to a point where we can actually instantiate realms using them
                    Realm.getInstanceAsync(libraryConfig, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with a library module.");
                        }
                    });

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with default and library modules.");
                        }
                    });
                    */
                } else {
                    Log.e(
                        "EXAMPLE",
                        "Failed to log in: " + it.error.errorMessage
                    )
                }
            }
        }
        expectation.await()
    }
}
