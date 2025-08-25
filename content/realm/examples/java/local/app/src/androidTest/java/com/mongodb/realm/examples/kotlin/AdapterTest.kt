package com.mongodb.realm.examples.kotlin

import android.view.ViewGroup
import android.widget.ListView
import androidx.recyclerview.widget.DividerItemDecoration
import androidx.recyclerview.widget.LinearLayoutManager
import androidx.recyclerview.widget.RecyclerView
import com.mongodb.realm.examples.RealmTest
import com.mongodb.realm.examples.model.kotlin.Item
import io.realm.Realm
import io.realm.RealmConfiguration
import org.junit.Test

class AdapterTest : RealmTest() {
    fun createNItems(realm: Realm, n: Int) {
        realm.executeTransaction { r: Realm? ->
            for (i in 0 until n) {
                val item = realm.createObject(Item::class.java)
                item.name = "Test Item #$i"
            }
        }
    }

    @Test
    fun testListAdapter() {
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .inMemory()
                .name("adapter-test-list-kotlin")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            createNItems(realm, 8)
            // :snippet-start: list-adapter
            // instantiate a ListView programmatically
            val listView = ListView(activity!!.applicationContext)
            listView.layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )

            // create an adapter with a RealmResults collection
            // and attach it to the ListView
            val adapter = ExampleListAdapter(realm.where(Item::class.java).findAll())
            listView.adapter = adapter
            val layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            activity!!.addContentView(listView, layoutParams)
            // :snippet-end:
        }
        // we're not using any advanced techniques to confirm that these adapters work -- instead,
        // run the test and make sure that you can see some "test item"s on the screen (10 seconds)
        try {
            Thread.sleep(10000L)
        } catch (e: InterruptedException) {
            // don't care
        }
    }

    @Test
    fun testRecyclerViewAdapter() {
        //Expectation expectation = new Expectation();
        activity!!.runOnUiThread {
            val config = RealmConfiguration.Builder()
                .inMemory()
                .name("adapter-test-recycler-kotlin")
                .allowQueriesOnUiThread(true)
                .allowWritesOnUiThread(true)
                .build()
            val realm = Realm.getInstance(config)
            createNItems(realm, 8)
            // :snippet-start: recycler-view-adapter
            // instantiate a RecyclerView programmatically
            val recyclerView = RecyclerView(activity!!.applicationContext)
            recyclerView.layoutManager =
                LinearLayoutManager(activity!!.applicationContext)
            recyclerView.setHasFixedSize(true)
            recyclerView.addItemDecoration(
                DividerItemDecoration(activity!!.applicationContext,
                    DividerItemDecoration.VERTICAL))

            // create an adapter with a RealmResults collection
            // and attach it to the RecyclerView
            val adapter = ExampleRecyclerViewAdapter(realm.where(Item::class.java).findAll())
            recyclerView.adapter = adapter
            val layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )
            activity!!.addContentView(recyclerView, layoutParams)
            // :snippet-end:
        }
        // we're not using any advanced techniques to confirm that these adapters work -- instead,
        // run the test and make sure that you can see some "test item"s on the screen (10 seconds)
        try {
            Thread.sleep(10000L)
        } catch (e: InterruptedException) {
            // don't care
        }
    }
}