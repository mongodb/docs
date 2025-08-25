package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.Project;
import com.mongodb.realm.examples.model.ProjectTask;

import org.bson.types.ObjectId;
import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmQuery;
import io.realm.RealmResults;
import io.realm.Sort;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class ReadsTest extends RealmTest {
    @Test
    public void getAllObjects() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: get-all-objects
                            RealmQuery<ProjectTask> tasksQuery = realm.where(ProjectTask.class);
                            RealmQuery<Project> projectsQuery = realm.where(Project.class);
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void findAnObjectByPrimaryKey() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            ObjectId PRIMARY_KEY_VALUE = new ObjectId();
                            realm.executeTransaction(r -> {
                                r.createObject(ProjectTask.class, PRIMARY_KEY_VALUE);
                            });
                            // :snippet-start: find-an-object-by-primary-key
                            ProjectTask task = realm.where(ProjectTask.class).equalTo("_id", PRIMARY_KEY_VALUE.get()).findFirst();
                            Log.v("EXAMPLE", "Fetched object by primary key: " + task);
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void filterResults() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            ObjectId PRIMARY_KEY_VALUE = new ObjectId();
                            realm.executeTransaction(r -> {
                                r.createObject(ProjectTask.class, PRIMARY_KEY_VALUE);
                            });
                            // :snippet-start: filter-results
                            RealmQuery<ProjectTask> tasksQuery = realm.where(ProjectTask.class);
                            Log.i("EXAMPLE", "High priority tasks: " + tasksQuery.greaterThan("priority", 5).count());
                            Log.i("EXAMPLE", "Just-started or short tasks: " + tasksQuery.between("progressMinutes", 1, 10).count());
                            Log.i("EXAMPLE", "Unassigned tasks: " + tasksQuery.isNull("assignee").count());
                            Log.i("EXAMPLE", "Ali or Jamie's tasks: " + tasksQuery.in("assignee", new String[]{"Ali", "Jamie"}).count());
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void sortResults() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), getRandomPartition())
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            ObjectId PRIMARY_KEY_VALUE = new ObjectId();
                            realm.executeTransaction(r -> {
                                r.createObject(ProjectTask.class, PRIMARY_KEY_VALUE);
                            });
                            // :snippet-start: sort-results
                            RealmQuery<Project> projectsQuery = realm.where(Project.class);
                            RealmResults<Project> results = projectsQuery.sort("name", Sort.DESCENDING).findAll();
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
            });
        });
        expectation.await();
    }
}
