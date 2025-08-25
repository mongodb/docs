package com.mongodb.realm.examples.java;
import android.util.Log;

import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.Expectation;
import org.junit.Test;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

import static com.mongodb.realm.examples.RealmTestKt.YOUR_APP_ID;
import static com.mongodb.realm.examples.RealmTestKt.getRandomPartition;

public class ErrorHandlerTest extends RealmTest {

    @Test
    public void handleErrors() {
        Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            String appID = YOUR_APP_ID; // replace this with your App ID
            App app = new App(new AppConfiguration.Builder(appID).build());
            String partition = getRandomPartition();

            Credentials credentials = Credentials.anonymous();
            app.loginAsync(credentials, it -> {
                if (it.isSuccess()) {
                    Log.v("EXAMPLE", "Successfully authenticated.");
                    User user = app.currentUser();
                    // :snippet-start: error-handler
                    SyncConfiguration config = new SyncConfiguration.Builder(user, partition)
                            .errorHandler((session, error) -> {
                                // do some error handling
                            }).build();
                    // :snippet-end:
                } else {
                    Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
                }
                expectation.fulfill();  // TODO: trigger a sync error and test this code!
            });
        });
        expectation.await();
    }
}
