package com.mongodb.realm.examples.kotlin

import android.os.AsyncTask
import android.os.Bundle
import android.util.Log
import android.view.View
import android.widget.LinearLayout
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.mongodb.realm.examples.R
import com.mongodb.realm.examples.model.java.Cat
import io.realm.Realm

class UnitTestActivity : AppCompatActivity() {
    private var rootLayout: LinearLayout? = null
    private var realm: Realm? = null
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        Realm.init(applicationContext)
        setContentView(R.layout.activity_unit_test)
        rootLayout = findViewById(R.id.container)
        rootLayout!!.removeAllViews()

        // open the default Realm for the UI thread.
        realm = Realm.getDefaultInstance()

        // clean up from previous run
        cleanUp()

        // small operation that is ok to run on the main thread
        basicCRUD(realm)

        // more complex operations can be executed on another thread.
        val foo: AsyncTask<Void?, Void?, String> = object : AsyncTask<Void?, Void?, String>() {
            protected override fun doInBackground(vararg params: Void?): String? {
                var info = ""
                info += complexQuery()
                return info
            }

            override fun onPostExecute(result: String) {
                showStatus(result)
            }
        }
        foo.execute()
        findViewById<View>(R.id.clean_up).setOnClickListener { view: View ->
            view.isEnabled = false
            Log.d("TAG", "clean up")
            cleanUp()
            view.isEnabled = true
        }
    }

    private fun cleanUp() {
        // delete all cats
        realm!!.executeTransaction { r: Realm -> r.delete(Cat::class.java) }
    }

    public override fun onDestroy() {
        super.onDestroy()
        realm!!.close() // remember to close realm when done.
    }

    private fun showStatus(txt: String) {
        Log.i(TAG, txt)
        val tv = TextView(this)
        tv.text = txt
        rootLayout!!.addView(tv)
    }

    private fun basicCRUD(realm: Realm?) {
        showStatus("Perform basic Create/Read/Update/Delete (CRUD) operations...")

        // all writes must be wrapped in a transaction to facilitate safe multi threading
        realm!!.executeTransaction { r: Realm ->
            // add a cat
            val cat = r.createObject(Cat::class.java)
            cat.name = "John Young"
        }

        // find the first cat (no query conditions) and read a field
        val cat = realm.where(Cat::class.java).findFirst()
        showStatus(cat!!.name)

        // update cat in a transaction
        realm.executeTransaction { r: Realm? ->
            cat.name = "John Senior"
        }
        showStatus(cat.name)

        // add two more cats
        realm.executeTransaction { r: Realm ->
            val jane = r.createObject(Cat::class.java)
            jane.name = "Jane"
            val doug = r.createObject(Cat::class.java)
            doug.name = "Robert"
        }
        val cats = realm.where(Cat::class.java).findAll()
        showStatus(String.format("Found %s cats", cats.size))
        for (p in cats) {
            showStatus("Found " + p.name)
        }
    }

    private fun complexQuery(): String {
        var status = "\n\nPerforming complex Query operation..."
        val realm = Realm.getDefaultInstance()
        status += """
            
            Number of cats in the DB: ${realm.where(Cat::class.java).count()}
            """.trimIndent()

        // find all cats where name begins with "J".
        val results = realm.where(Cat::class.java)
            .beginsWith("name", "J")
            .findAll()
        status += """
            
            Number of cats whose name begins with 'J': ${results.size}
            """.trimIndent()
        realm.close()
        return status
    }

    companion object {
        val TAG = UnitTestActivity::class.java.name
    }
}
