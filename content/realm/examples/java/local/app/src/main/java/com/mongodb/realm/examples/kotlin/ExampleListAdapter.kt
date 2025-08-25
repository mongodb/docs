package com.mongodb.realm.examples.kotlin
// :snippet-start: complete
import android.util.Log
import android.view.View
import android.view.ViewGroup
import android.widget.LinearLayout
import android.widget.ListAdapter
import android.widget.TextView
import com.mongodb.realm.examples.model.kotlin.Item
import io.realm.OrderedRealmCollection
import io.realm.RealmBaseAdapter


internal class ExampleListAdapter(realmResults: OrderedRealmCollection<Item?>?) :
    RealmBaseAdapter<Item?>(realmResults), ListAdapter {
    var TAG = "REALM_LIST_ADAPTER"

    override fun getView(position: Int,
                         convertView: View?,
                         parent: ViewGroup): View {
        var convertView = convertView
        val viewHolder: ViewHolder
        if (convertView == null) {
            Log.i(TAG, "Creating view holder")
            // create a top-level layout for our item views
            val layout = LinearLayout(parent.context)
            layout.layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )

            // create a text view to display item names
            val titleView = TextView(parent.context)
            titleView.layoutParams = ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
            )

            // attach the text view to the item view layout
            layout.addView(titleView)
            convertView = layout
            viewHolder = ViewHolder(titleView)
            convertView.tag = viewHolder
        } else {
            viewHolder = convertView.tag as ViewHolder
        }

        // as long as we
        if (adapterData != null) {
            val item = adapterData!![position]!!
            viewHolder.title.text = item.name
            Log.i(TAG, "Populated view holder with data: ${item.name}")
        } else {
            Log.e(TAG, "No data in adapter! Failed to populate view holder.")
        }
        return convertView
    }

    private class ViewHolder(var title: TextView)
}
// :snippet-end: