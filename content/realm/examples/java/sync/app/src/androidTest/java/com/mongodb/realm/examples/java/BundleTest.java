package com.mongodb.realm.examples.java;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;

import android.os.Handler;
import android.os.HandlerThread;
import android.util.Log;

import androidx.annotation.NonNull;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.kotlin.Frog;

import org.bson.types.ObjectId;
import org.junit.Assert;
import org.junit.Test;

import java.io.File;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

public class BundleTest extends RealmTest {

    @Test
    public void copyARealmFile() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread (() -> {
            // :snippet-start: copy-a-realm-file
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(appID);
            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");
                    String PARTITION = "PARTITION_YOU_WANT_TO_BUNDLE";

                    // you can only create realm copies on a background thread with a looper.
                    // HandlerThread provides a Looper-equipped thread.
                    HandlerThread handlerThread = new HandlerThread("CopyARealmHandler");
                    handlerThread.start();
                    Handler handler = new Handler(handlerThread.getLooper());
                    handler.post(new Thread(new Runnable() { @Override public void run() {
                        SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                                // wait for the realm to download all data from the backend before opening
                                .waitForInitialRemoteData() // :emphasize:
                                .build();

                        Realm realm = Realm.getInstance(config);
                        Log.v("EXAMPLE", "Successfully opened a realm.");

                        // write a copy of the realm you can manually copy to your production application assets
                        File outputDir = activity.getApplicationContext().getCacheDir();
                        File outputFile = new File(outputDir.getPath() + "/" +  PARTITION + "_bundled.realm");

                        // ensure all local changes have synced to the backend
                        try {
                            app.getSync().getSession(config).uploadAllLocalChanges(10000, TimeUnit.MILLISECONDS);
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }

                        // cannot write to file if it already exists. Delete the file if already there
                        outputFile.delete();

                        realm.writeCopyTo(outputFile); // :emphasize:

                        // search for this log line to find the location of the realm copy
                        Log.i("EXAMPLE", "Wrote copy of realm to " + outputFile.getAbsolutePath());

                        // always close a realm when you're done using it
                        realm.close();
                        expectation.fulfill(); // :remove:
                    }}));
                } else {
                    Log.e("EXAMPLE", "Failed to authenticate: " + it.getError().toString());
                }
            });
            // :snippet-end:
        });

        expectation.await();
    }

    @Test
    public void useABundledRealmFile() {
        Expectation expectation = new Expectation();

        activity.runOnUiThread (() -> {
            // :snippet-start: use-bundled-realm-file
            String appID = YOUR_APP_ID; // replace this with your App ID

            App app = new App(appID);

            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");

                    // asset file name should correspond to the name of the bundled file
                    SyncConfiguration config = new SyncConfiguration.Builder(
                                app.currentUser(),
                                "PARTITION_YOU_WANT_TO_BUNDLE")
                            .assetFile("example_bundled.realm") // :emphasize:
                            .build();

                    Realm realm = Realm.getInstance(config);

                    Log.v("EXAMPLE", "Successfully opened bundled realm.");

                    // read and write to the bundled realm as normal
                    realm.executeTransactionAsync(transactionRealm -> {
                        Frog frog = new Frog(new ObjectId(),
                                "Asimov",
                                4,
                                "red eyed tree frog",
                                "Spike");
                        transactionRealm.insert(frog);
                        expectation.fulfill();
                    });
                } else {
                    Log.e("EXAMPLE", "Failed to authenticate: " + it.getError().toString());
                }
            });
            // :snippet-end:
        });
        expectation.await();
    }
}
