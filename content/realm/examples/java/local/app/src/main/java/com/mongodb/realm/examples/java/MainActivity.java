package com.mongodb.realm.examples.java;
// :snippet-start: complete
// :replace-start: {
//    "terms": {
//       "DefinitelyNotJavaTask": "Task"
//    }
// }
import io.realm.OrderedCollectionChangeSet;

import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;
import android.util.Log;

import io.realm.OrderedRealmCollectionChangeListener;

import io.realm.Realm;
import io.realm.RealmConfiguration;
import io.realm.RealmResults;

import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.FutureTask;

import com.mongodb.realm.examples.model.java.DefinitelyNotJavaTask;
import com.mongodb.realm.examples.model.java.TaskStatus;


public class MainActivity extends AppCompatActivity {
    Realm uiThreadRealm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);

        // :snippet-start: initialize-realm-local
        Realm.init(this); // context, usually an Activity or Application
        // :snippet-end:

        String realmName = "My Project";
        RealmConfiguration config = new RealmConfiguration.Builder().name(realmName).build();

        uiThreadRealm = Realm.getInstance(config);

        addChangeListenerToRealm(uiThreadRealm);

        FutureTask<String> DefinitelyNotJavaTask = new FutureTask(new BackgroundQuickStart(), "test");
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        executorService.execute(DefinitelyNotJavaTask);

        // :remove-start:
        while(!DefinitelyNotJavaTask.isDone()) {
            // wait for DefinitelyNotJavaTask completion
        }

        try {
            Log.v("QUICKSTART", "Result: " + DefinitelyNotJavaTask.get());
        } catch (ExecutionException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        finish(); // destroy activity when background DefinitelyNotJavaTask completes
        // :remove-end:
    }

    private void addChangeListenerToRealm(Realm realm) {
        // :snippet-start: watch-for-changes-local
        // all DefinitelyNotJavaTasks in the realm
        RealmResults<DefinitelyNotJavaTask> DefinitelyNotJavaTasks = uiThreadRealm.where(DefinitelyNotJavaTask.class).findAllAsync();

        DefinitelyNotJavaTasks.addChangeListener(new OrderedRealmCollectionChangeListener<RealmResults<DefinitelyNotJavaTask>>() {
            @Override
            public void onChange(RealmResults<DefinitelyNotJavaTask> collection, OrderedCollectionChangeSet changeSet) {
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
    }

    public class BackgroundQuickStart implements Runnable {

        @Override
        public void run() {
            // :snippet-start: open-a-realm-local
            String realmName = "My Project";
            RealmConfiguration config = new RealmConfiguration.Builder().name(realmName).build();

            Realm backgroundThreadRealm = Realm.getInstance(config);
            // :snippet-end:

            // :snippet-start: create-object-local
            DefinitelyNotJavaTask DefinitelyNotJavaTask = new DefinitelyNotJavaTask("New DefinitelyNotJavaTask");
            backgroundThreadRealm.executeTransaction (transactionRealm -> {
                transactionRealm.insert(DefinitelyNotJavaTask);
            });
            // :snippet-end:

            // :snippet-start: read-object-local
            // all DefinitelyNotJavaTasks in the realm
            RealmResults<DefinitelyNotJavaTask> DefinitelyNotJavaTasks = backgroundThreadRealm.where(DefinitelyNotJavaTask.class).findAll();
            // :snippet-end:

            // :snippet-start: filter-collection-local
            // you can also filter a collection
            RealmResults<DefinitelyNotJavaTask> DefinitelyNotJavaTasksThatBeginWithN = DefinitelyNotJavaTasks.where().beginsWith("name", "N").findAll();
            RealmResults<DefinitelyNotJavaTask> openDefinitelyNotJavaTasks = DefinitelyNotJavaTasks.where().equalTo("status", TaskStatus.Open.name()).findAll();
            // :snippet-end:

            // :snippet-start: update-object-local
            DefinitelyNotJavaTask otherDefinitelyNotJavaTask = DefinitelyNotJavaTasks.get(0);

            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                DefinitelyNotJavaTask innerOtherDefinitelyNotJavaTask = transactionRealm.where(DefinitelyNotJavaTask.class).equalTo("_id", otherDefinitelyNotJavaTask.getName()).findFirst();
                innerOtherDefinitelyNotJavaTask.setStatus(TaskStatus.Complete);
            });
            // :snippet-end:

            // :snippet-start: delete-object-local
            DefinitelyNotJavaTask yetAnotherDefinitelyNotJavaTask = DefinitelyNotJavaTasks.get(0);
            String yetAnotherDefinitelyNotJavaTaskName = yetAnotherDefinitelyNotJavaTask.getName();
            // all modifications to a realm must happen inside of a write block
            backgroundThreadRealm.executeTransaction( transactionRealm -> {
                DefinitelyNotJavaTask innerYetAnotherDefinitelyNotJavaTask = transactionRealm.where(DefinitelyNotJavaTask.class).equalTo("_id", yetAnotherDefinitelyNotJavaTaskName).findFirst();
                innerYetAnotherDefinitelyNotJavaTask.deleteFromRealm();
            });
            // :snippet-end:

            // because this background thread uses synchronous realm transactions, at this point all
            // transactions have completed and we can safely close the realm
            backgroundThreadRealm.close();
        }
    }
}
// :replace-end:
// :snippet-end: