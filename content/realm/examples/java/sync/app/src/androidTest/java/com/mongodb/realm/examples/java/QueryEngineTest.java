package com.mongodb.realm.examples.java;

import android.util.Log;

import com.mongodb.realm.examples.Expectation;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.Project;
import com.mongodb.realm.examples.model.java.ProjectTask;

import org.junit.Test;

import io.realm.Case;
import io.realm.Realm;
import io.realm.RealmQuery;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class QueryEngineTest extends RealmTest {

    @Test
    public void testComparisonOperators() {
        Expectation expectation = new Expectation();

        String PARTITION = getRandomPartition();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");

                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                        Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                        // :snippet-start: comparison-operators
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
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testLogicalOperators() {
        Expectation expectation = new Expectation();

        String PARTITION = getRandomPartition();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");

                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: logical-operators
                            RealmQuery<ProjectTask> tasksQuery = realm.where(ProjectTask.class);
                            Log.i("EXAMPLE", "Ali has completed " +
                                    tasksQuery.equalTo("assignee", "Ali").and().equalTo("isComplete", true).findAll().size() +
                                    " tasks.");
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testStringOperators() {
        Expectation expectation = new Expectation();

        String PARTITION = getRandomPartition();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");

                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                            Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                            // :snippet-start: string-operators
                            RealmQuery<Project> projectsQuery = realm.where(Project.class);
                            // Pass Case.INSENSITIVE as the third argument for case insensitivity.
                            Log.i("EXAMPLE", "Projects that start with 'e': "
                                    + projectsQuery.beginsWith("name", "e", Case.INSENSITIVE).count());
                            Log.i("EXAMPLE", "Projects that contain 'ie': "
                                    + projectsQuery.contains("name", "ie").count());
                            // :remove-start:
                            expectation.fulfill();
                            // :remove-end:
                            // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }

    @Test
    public void testAggregateOperators() {
        Expectation expectation = new Expectation();

        String PARTITION = getRandomPartition();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID)
                    .build());

            Credentials anonymousCredentials = Credentials.anonymous();

            app.loginAsync(anonymousCredentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated anonymously.");

                    SyncConfiguration config = new SyncConfiguration.Builder(app.currentUser(), PARTITION)
                            .allowQueriesOnUiThread(true)
                            .allowWritesOnUiThread(true)
                            .build();

                    Realm.getInstanceAsync(config, new Realm.Callback() {
                        @Override
                        public void onSuccess(Realm realm) {
                        Log.v("EXAMPLE", "Successfully opened a realm with reads and writes allowed on the UI thread.");
                        // :snippet-start: aggregate-operators
                        RealmQuery<ProjectTask> tasksQuery = realm.where(ProjectTask.class);
                        /*
                        Aggregate operators do not support dot-notation, so you
                        cannot directly operate on a property of all of the objects
                        in a collection property.

                        You can operate on a numeric property of the top-level
                        object, however:
                        */
                        Log.i("EXAMPLE", "Tasks average priority: " + tasksQuery.average("priority"));
                        // :remove-start:
                        expectation.fulfill();
                        // :remove-end:
                        // :snippet-end:
                        }
                    });
                } else {
                    Log.e("EXAMPLE", it.getError().toString());
                }
            });
        });
        expectation.await();
    }
}
