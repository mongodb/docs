package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
//import com.mongodb.realm.examples.kotlin.MyLibraryModule;

import org.junit.Test;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

public class RealmsTest extends RealmTest {

    @Test
    public void realmModules() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            String LIBRARY_PARTITION = "library_example";
            String PARTITION = "example";
            Credentials credentials = Credentials.anonymous();

            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    /*
                    // :snippet-start: modules
                    // A library must create a module and set library = true. This will prevent the default
                    // module from being created.
                    // allClasses = true can be used instead of listing all classes in the library.
                    @RealmModule(library = true, allClasses = true)
                    public class MyLibraryModule {}

                    // ...

                    // Library projects are therefore required to explicitly set their own module.
                    SyncConfiguration libraryConfig = new SyncConfiguration.Builder(app.currentUser(), LIBRARY_PARTITION)
                            .modules(new MyLibraryModule())
                            .build();

                    // Apps can add the library RealmModule to their own schema.
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .modules(Realm.getDefaultModule(), new MyLibraryModule())
                            .build();
                    // :snippet-end:
                    */
                    expectation.fulfill();
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
                    Log.e("EXAMPLE", "Failed to log in: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
