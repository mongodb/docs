import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.ListAdapter;
import android.widget.TextView;
import com.mongodb.realm.examples.model.java.Item;
import io.realm.OrderedRealmCollection;
import io.realm.RealmBaseAdapter;

class ExampleListAdapter extends RealmBaseAdapter<Item> implements ListAdapter {
    String TAG = "REALM_LIST_ADAPTER";

    ExampleListAdapter(OrderedRealmCollection<Item> realmResults) {
        super(realmResults);
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        ViewHolder viewHolder;
        if (convertView == null) {
            Log.i(TAG, "Creating view holder");
            // create a top-level layout for our item views
            LinearLayout layout = new LinearLayout(parent.getContext());
            layout.setLayoutParams(
                    new ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT));

            // create a text view to display item names
            TextView titleView = new TextView(parent.getContext());
            titleView.setLayoutParams(
                    new ViewGroup.LayoutParams(
                            ViewGroup.LayoutParams.MATCH_PARENT,
                            ViewGroup.LayoutParams.MATCH_PARENT));

            // attach the text view to the item view layout
            layout.addView(titleView);
            convertView = layout;
            viewHolder = new ViewHolder(titleView);
            convertView.setTag(viewHolder);
        } else {
            viewHolder = (ViewHolder) convertView.getTag();
        }

        // as long as we
        if (adapterData != null) {
            final Item item = adapterData.get(position);
            viewHolder.title.setText(item.getName());
            Log.i(TAG, "Populated view holder with data: " + item.getName());
        } else {
            Log.e(TAG, "No data in adapter! Failed to populate view holder.");
        }
        return convertView;
    }

    private static class ViewHolder {
        TextView title;

        public ViewHolder(TextView textView) {
            title = textView;
        }
    }
}
