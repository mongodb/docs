package com.mongodb.realm.examples.java;
// :replace-start: {
//    "terms": {
//       "JavaItem": "Item"
//    }
// }
import android.view.ViewGroup;
import android.widget.ListView;

import androidx.recyclerview.widget.DividerItemDecoration;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.mongodb.realm.examples.RealmTest;
import com.mongodb.realm.examples.model.java.JavaItem;

import org.junit.Test;

import io.realm.Realm;
import io.realm.RealmConfiguration;

public class AdapterTest extends RealmTest {

    public void createNItems(Realm realm, int n) {
        realm.executeTransaction(r -> {
            for (int i = 0; i < n; ++i) {
                JavaItem item = realm.createObject(JavaItem.class);
                item.setName("Test Item #" + i);
            }
        });
    }
    @Test
    public void testListAdapter() {
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .inMemory()
                    .name("adapter-test-list-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            createNItems(realm, 8);
            // :snippet-start: list-adapter
            // instantiate a ListView programmatically
            ListView listView = new ListView(activity.getApplicationContext());
            listView.setLayoutParams(
                    new ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT));

            // create an adapter with a RealmResults collection
            // and attach it to the ListView
            ExampleListAdapter adapter =
                    new ExampleListAdapter(
                            realm.where(JavaItem.class).findAll());
            listView.setAdapter(adapter);
            ViewGroup.LayoutParams layoutParams =
                    new ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT);
            activity.addContentView(listView, layoutParams);
            // :snippet-end:
        });
        // we're not using any advanced techniques to confirm that these adapters work -- instead,
        // run the test and make sure that you can see some "test item"s on the screen (10 seconds)
        try {
            Thread.sleep(10000L);
        } catch (InterruptedException e) {
            // don't care
        }
    }

    @Test
    public void testRecyclerViewAdapter() {
        //Expectation expectation = new Expectation();
        activity.runOnUiThread(() -> {
            RealmConfiguration config = new RealmConfiguration.Builder()
                    .inMemory()
                    .name("adapter-test-recycler-java")
                    .allowQueriesOnUiThread(true)
                    .allowWritesOnUiThread(true)
                    .build();

            Realm realm = Realm.getInstance(config);
            createNItems(realm, 8);
            // :snippet-start: recycler-view-adapter
            // instantiate a RecyclerView programmatically
            RecyclerView recyclerView =
                    new RecyclerView(activity.getApplicationContext());
            recyclerView.setLayoutManager(
                    new LinearLayoutManager(activity.getApplicationContext()));
            recyclerView.setHasFixedSize(true);
            recyclerView.addItemDecoration(new DividerItemDecoration(
                    activity.getApplicationContext(),
                    DividerItemDecoration.VERTICAL));

            // create an adapter with a RealmResults collection
            // and attach it to the RecyclerView
            ExampleRecyclerViewAdapter adapter =
                    new ExampleRecyclerViewAdapter(
                            realm.where(JavaItem.class).findAll());
            recyclerView.setAdapter(adapter);
            ViewGroup.LayoutParams layoutParams =
                    new ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT);
            activity.addContentView(recyclerView, layoutParams);
            // :snippet-end:
        });
        // we're not using any advanced techniques to confirm that these adapters work -- instead,
        // run the test and make sure that you can see some "test item"s on the screen (10 seconds)
        try {
            Thread.sleep(10000L);
        } catch (InterruptedException e) {
            // don't care
        }
    }
}
// :replace-end: