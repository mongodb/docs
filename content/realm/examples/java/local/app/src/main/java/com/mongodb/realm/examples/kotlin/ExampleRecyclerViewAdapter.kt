package com.mongodb.realm.examples.kotlin
// :snippet-start: complete
import android.util.Log
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.mongodb.realm.examples.model.kotlin.Item
import io.realm.OrderedRealmCollection
import io.realm.RealmRecyclerViewAdapter

/*
 * ExampleRecyclerViewAdapter: extends the Realm-provided
 * RealmRecyclerViewAdapter to provide data
 * for a RecyclerView to display
 * Realm objects on screen to a user.
 */
internal class ExampleRecyclerViewAdapter(data: OrderedRealmCollection<Item?>?) :
    RealmRecyclerViewAdapter<Item?,
            ExampleRecyclerViewAdapter.ExampleViewHolder?>(data, true) {
    var TAG = "REALM_RECYCLER_ADAPTER"

    override fun onCreateViewHolder(parent: ViewGroup,
                                    viewType: Int): ExampleViewHolder {
        Log.i(TAG, "Creating view holder")
        val textView = TextView(parent.context)
        textView.layoutParams = ViewGroup.LayoutParams(
            ViewGroup.LayoutParams.MATCH_PARENT,
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        return ExampleViewHolder(textView)
    }

    override fun onBindViewHolder(holder: ExampleViewHolder, position: Int) {
        val obj = getItem(position)
        Log.i(TAG, "Binding view holder: ${obj!!.name}")
        holder.data = obj
        holder.title.text = obj.name
    }

    override fun getItemId(index: Int): Long {
        return getItem(index)!!.id.toLong()
    }

    internal inner class ExampleViewHolder(var title: TextView)
        : RecyclerView.ViewHolder(title) {
        var data: Item? = null
    }

    init {
        Log.i(TAG,
            "Created RealmRecyclerViewAdapter for ${getData()!!.size} items.")
    }
}
// :snippet-end: