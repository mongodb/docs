import android.annotation.SuppressLint;
import android.content.Context;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.concurrent.futures.ResolvableFuture;
import androidx.work.ListenableWorker;
import androidx.work.WorkerParameters;

import com.google.common.util.concurrent.ListenableFuture;

import java.util.concurrent.TimeUnit;

import io.realm.Realm;
import io.realm.mongodb.App;
import io.realm.mongodb.AppConfiguration;
import io.realm.mongodb.Credentials;
import io.realm.mongodb.User;
import io.realm.mongodb.sync.SyncConfiguration;

public class RealmBackgroundWorker extends ListenableWorker {
    static final String UNIQUE_WORK_NAME = "RealmBackgroundWorker";
    private ResolvableFuture<Result> future;

    public RealmBackgroundWorker(@NonNull Context context, @NonNull WorkerParameters workerParams) {
        super(context, workerParams);
    }

    @SuppressLint("RestrictedApi")
    @NonNull
    @Override
    public ListenableFuture<Result> startWork() {
        future = ResolvableFuture.create();
        Realm.init(this.getApplicationContext());
        String appID = YOUR_APP_ID; // replace this with your App ID
        App app = new App(new AppConfiguration.Builder(appID).build());

        Credentials credentials = Credentials.anonymous();
        app.loginAsync(credentials, it -> {
            if (it.isSuccess()) {
                Log.v("EXAMPLE", "Successfully authenticated.");

                User user = app.currentUser();
                SyncConfiguration config = new SyncConfiguration.Builder(user, "PARTITION")
                        .build();
                Realm.getInstanceAsync(config, new Realm.Callback() {
                    @Override
                    public void onSuccess(Realm realm) {
                        Log.v("EXAMPLE", "Successfully opened a realm for background synchronization.");
                        try {
                            app.getSync().getSession(config).downloadAllServerChanges();
                            app.getSync().getSession(config).uploadAllLocalChanges();
                        } catch (InterruptedException e) {
                            e.printStackTrace();
                        }
                    }
                });
            } else {
                Log.e("EXAMPLE", "Failed login: " + it.getError().getErrorMessage());
            }
        });
        return future;
    }
}
