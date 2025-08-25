package com.mongodb.realm.examples;

import static com.mongodb.realm.examples.CustomApplicationKt.YOUR_APP_ID;

import android.annotation.SuppressLint;
import android.app.Application;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.work.Constraints;
import androidx.work.ExistingPeriodicWorkPolicy;
import androidx.work.ListenableWorker;
import androidx.work.NetworkType;
import androidx.work.PeriodicWorkRequest;
import androidx.work.WorkManager;
import androidx.work.Worker;
import androidx.work.WorkerParameters;

import com.google.common.util.concurrent.ListenableFuture;

import java.util.concurrent.TimeUnit;

import io.realm.Realm;
import io.realm.log.LogLevel;
import io.realm.log.RealmLog;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

/*
 * TaskTracker: Sets up the taskApp Realm App and enables Realm-specific logging in debug mode.
 */
class CustomApplicationJava extends Application {

    App taskApp;

    @Override
    public void onCreate() {
        super.onCreate();
        Realm.init(this);
        taskApp = new App(
            new AppConfiguration.Builder("android-example-testers-rztwe")
            .build());

        // Enable more logging in debug mode
        if (BuildConfig.DEBUG) {
            RealmLog.setLevel(LogLevel.ALL);
        }

        Log.v("EXAMPLE", "Initialized the Realm App configuration.");

        // :snippet-start: background-sync-realm
        Constraints constraints = new Constraints.Builder()
                .setRequiredNetworkType(NetworkType.UNMETERED)
                .setRequiresBatteryNotLow(true)
                .build();
        PeriodicWorkRequest backgroundRealmSync =
                new PeriodicWorkRequest
                        .Builder(RealmBackgroundWorker.class,
                            // repeat every 12 hours
                            12, TimeUnit.HOURS,
                            // execute job at any point during that 12 hour period
                            12, TimeUnit.HOURS)
                .setConstraints(constraints)
                .build();
        // enqueue the work job, replacing it with the most recent version if we update it
        WorkManager.getInstance(this).enqueueUniquePeriodicWork(
                RealmBackgroundWorker.UNIQUE_WORK_NAME,
                ExistingPeriodicWorkPolicy.REPLACE,
                backgroundRealmSync);
        // :snippet-end:
        try {
            assert (WorkManager.getInstance(this)
                    .getWorkInfosForUniqueWork(RealmBackgroundWorker.UNIQUE_WORK_NAME)
                    .get()
                    .get(0) != null);
        } catch (Exception e) {
            Log.v("EXAMPLE", e.getMessage());
        }
    }
}