// :snippet-start: unit-test-activity
package com.mongodb.realm.examples.java;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;

import android.os.AsyncTask;
import android.util.Log;
import android.widget.LinearLayout;
import android.widget.TextView;

import com.mongodb.realm.examples.R;
import com.mongodb.realm.examples.model.java.Cat;

import io.realm.Realm;
import io.realm.RealmResults;

public class UnitTestActivity extends AppCompatActivity {

    public static final String TAG = UnitTestActivity.class.getName();
    private LinearLayout rootLayout = null;

    private Realm realm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Realm.init(getApplicationContext());
        setContentView(R.layout.activity_unit_test);
        rootLayout = findViewById(R.id.container);
        rootLayout.removeAllViews();

        // open the default Realm for the UI thread.
        realm = Realm.getDefaultInstance();

        // clean up from previous run
        cleanUp();

        // small operation that is ok to run on the main thread
        basicCRUD(realm);

        // more complex operations can be executed on another thread.
        AsyncTask<Void, Void, String> foo = new AsyncTask<Void, Void, String>() {
            @Override
            protected String doInBackground(Void... voids) {
                String info = "";
                info += complexQuery();
                return info;
            }

            @Override
            protected void onPostExecute(String result) {
                showStatus(result);
            }
        };

        foo.execute();

        findViewById(R.id.clean_up).setOnClickListener(view -> {
            view.setEnabled(false);
            Log.d("TAG", "clean up");
            cleanUp();
            view.setEnabled(true);
        });
    }

    private void cleanUp() {
        // delete all cats
        realm.executeTransaction(r -> r.delete(Cat.class));
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        realm.close(); // remember to close realm when done.
    }

    private void showStatus(String txt) {
        Log.i(TAG, txt);
        TextView tv = new TextView(this);
        tv.setText(txt);
        rootLayout.addView(tv);
    }

    private void basicCRUD(Realm realm) {
        showStatus("Perform basic Create/Read/Update/Delete (CRUD) operations...");

        // all writes must be wrapped in a transaction to facilitate safe multi threading
        realm.executeTransaction(r -> {
            // add a cat
            Cat cat = r.createObject(Cat.class);
            cat.setName("John Young");
        });

        // find the first cat (no query conditions) and read a field
        final Cat cat = realm.where(Cat.class).findFirst();
        showStatus(cat.getName());

        // update cat in a transaction
        realm.executeTransaction(r -> {
            cat.setName("John Senior");
        });

        showStatus(cat.getName());

        // add two more cats
        realm.executeTransaction(r -> {
            Cat jane = r.createObject(Cat.class);
            jane.setName("Jane");

            Cat doug = r.createObject(Cat.class);
            doug.setName("Robert");
        });

        RealmResults<Cat> cats = realm.where(Cat.class).findAll();
        showStatus(String.format("Found %s cats", cats.size()));
        for (Cat p : cats) {
            showStatus("Found " + p.getName());
        }
    }

    private String complexQuery() {
        String status = "\n\nPerforming complex Query operation...";

        Realm realm = Realm.getDefaultInstance();
        status += "\nNumber of cats in the DB: " + realm.where(Cat.class).count();

        // find all cats where name begins with "J".
        RealmResults<Cat> results = realm.where(Cat.class)
                .beginsWith("name", "J")
                .findAll();
        status += "\nNumber of cats whose name begins with 'J': " + results.size();

        realm.close();
        return status;
    }
}
// :snippet-end: