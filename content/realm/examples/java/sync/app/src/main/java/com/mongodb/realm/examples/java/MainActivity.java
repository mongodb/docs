package com.mongodb.realm.examples.java;
// :snippet-start: complete
import io.realm.OrderedCollectionChangeSet;

import org.bson.types.ObjectId;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;

import io.realm.OrderedRealmCollectionChangeListener;

import io.realm.Realm;
import io.realm.RealmResults;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;

import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;

import com.mongodb.realm.examples.model.Task;
import com.mongodb.realm.examples.model.TaskStatus;


public class MainActivity extends AppCompatActivity {
    Realm uiThreadRealm;
    App app;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // :snippet-start: initialize-realm
        Realm.init(this); // context, usually an Activity or Application
        // :snippet-end:

        // :snippet-start: initialize-the-app
        // :remove-start:
        String appID = "example-testers-kvjdy"; // replace this with your App ID
        // :replace-with:
        //String appID = YOUR_APP_ID;
        // :remove-end:
        app = new App(new AppConfiguration.Builder(appID)
            .build());
        // :snippet-end:

        // :snippet-start: authenticate-a-user
        Credentials credentials = Credentials.anonymous();

        app.loginAsync(credentials, result -> {
            if (result.isSuccess()) {
                Log.v("QUICKSTART", "Successfully authenticated anonymously.");
                User user = app.currentUser();

                String partitionValue = "My Project";
                SyncConfiguration config = new SyncConfiguration.Builder(
                        user,
                        partitionValue)
                    .build();

                uiThreadRealm = Realm.getInstance(config);

                addChangeListenerToRealm(uiThreadRealm);

                FutureTask<String> task = new FutureTask(new BackgroundQuickStart(app.currentUser()), "test");
                ExecutorService executorService = Executors.newFixedThreadPool(2);
                executorService.execute(task);

                // :remove-start:
                while(!task.isDone()) {
                    // wait for task completion
                }

                try {
                    Log.v("QUICKSTART", "Result: " + task.get());
                } catch (ExecutionException e) {
                    e.printStackTrace();
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
                finish(); // destroy activity when background task completes
                // :remove-end:
            } else {
                Log.e("QUICKSTART", "Failed to log in. Error: " + result.getError());
            }
        });
        // :snippet-end:
    }

    private void addChangeListenerToRealm(Realm realm) {
        // :snippet-start: watch-for-changes
        // all tasks in the realm
        RealmResults<Task> tasks = uiThreadRealm.where(Task.class).findAllAsync();

        tasks.addChangeListener(new OrderedRealmCollectionChangeListener<RealmResults<Task>>() {
            @Override
            public void onChange(RealmResults<Task> collection, OrderedCollectionChangeSet changeSet) {
                // process deletions in reverse order if maintaining parallel data structures so indices don't change as you iterate
                OrderedCollectionChangeSet.Range[] deletions = changeSet.getDeletionRanges();
                for (OrderedCollectionChangeSet.Range range : deletions) {
                    Log.v("QUICKSTART", "Deleted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));
                }

                OrderedCollectionChangeSet.Range[] insertions = changeSet.getInsertionRanges();
                for (OrderedCollectionChangeSet.Range range : insertions) {
                    Log.v("QUICKSTART", "Inserted range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));                            }

                OrderedCollectionChangeSet.Range[] modifications = changeSet.getChangeRanges();
                for (OrderedCollectionChangeSet.Range range : modifications) {
                    Log.v("QUICKSTART", "Updated range: " + range.startIndex + " to " + (range.startIndex + range.length - 1));                            }
            }
        });
        // :snippet-end:
    }


    @Override
    protected void onDestroy() {
        super.onDestroy();
        // the ui thread realm uses asynchronous transactions, so we can only safely close the realm
        // when the activity ends and we can safely assume that those transactions have completed
        uiThreadRealm.close();
        // :snippet-start: log-out
        app.currentUser().logOutAsync(result -> {
            if (result.isSuccess()) {
                Log.v("QUICKSTART", "Successfully logged out.");
            } else {
                Log.e("QUICKSTART", "Failed to log out, error: " + result.getError());
            }
        });
        // :snippet-end:
    }

    public class BackgroundQuickStart implements Runnable {
        User user;

        public BackgroundQuickStart(User user) {
            this.user = user;
        }

        @Override
        public void run() {
            // :snippet-start: open-a-realm
            String partitionValue = "My Project";
            SyncConfiguration config = new SyncConfiguration.Builder(
                    user,
                    partitionValue)
                .build();

            Realm backgroundThreadRealm = Realm.getInstance(config);
            // :snippet-end:

            // :snippet-start: create-object
            Task task = new Task("New Task");
            backgroundThreadRealm.executeTransaction (transactionRealm -> {
                transactionRealm.insert(task);
            });
            // :snippet-end:

            // :snippet-start: read-object
            // all tasks in the realm
            RealmResults<Task> tasks = backgroundThreadRealm.where(Task.class).findAll();
            // :snippet-end:

            // :snippet-start: filter-collection
            // you can also filter a collection
            RealmResults<Task> tasksThatBeginWithN = tasks.where().beginsWith("name", "N").findAll();
            RealmResults<Task> openTasks = tasks.where().equalTo("status", TaskStatus.Open.name()).findAll();
            // :snippet-end:

            // :snippet-start: update-object
            Task otherTask = tasks.get(0);

            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                Task innerOtherTask = transactionRealm.where(Task.class).equalTo("_id", otherTask.get_id()).findFirst();
                innerOtherTask.setStatus(TaskStatus.Complete);
            });
            // :snippet-end:

            // :snippet-start: delete-object
            Task yetAnotherTask = tasks.get(0);
            ObjectId yetAnotherTaskId = yetAnotherTask.get_id();
            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                Task innerYetAnotherTask = transactionRealm.where(Task.class).equalTo("_id", yetAnotherTaskId).findFirst();
                innerYetAnotherTask.deleteFromRealm();
            });
            // :snippet-end:

            // because this background thread uses synchronous realm transactions, at this point all
            // transactions have completed and we can safely close the realm
            backgroundThreadRealm.close();
        }
    }
}
// :snippet-end: