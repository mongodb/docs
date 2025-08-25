import android.util.Log;
import android.view.ViewGroup;
import android.widget.TextView;
import androidx.recyclerview.widget.RecyclerView;
import com.mongodb.realm.examples.model.java.Item;
import io.realm.OrderedRealmCollection;
import io.realm.RealmRecyclerViewAdapter;

/*
 * ExampleRecyclerViewAdapter: extends the Realm-provided
 * RealmRecyclerViewAdapter to provide data
 * for a RecyclerView to display
 * Realm objects on screen to a user.
 */
class ExampleRecyclerViewAdapter
        extends RealmRecyclerViewAdapter<Item,
        ExampleRecyclerViewAdapter.ExampleViewHolder> {
    String TAG = "REALM_RECYCLER_ADAPTER";

    ExampleRecyclerViewAdapter(OrderedRealmCollection<Item> data) {
        super(data, true);
        Log.i(TAG, "Created RealmRecyclerViewAdapter for "
                + getData().size() + " items.");
    }

    @Override
    public ExampleViewHolder onCreateViewHolder(ViewGroup parent,
                                                int viewType) {
        Log.i(TAG, "Creating view holder");
        TextView textView = new TextView(parent.getContext());
        textView.setLayoutParams(
                new ViewGroup.LayoutParams(
                        ViewGroup.LayoutParams.MATCH_PARENT,
                        ViewGroup.LayoutParams.WRAP_CONTENT));
        return new ExampleViewHolder(textView);
    }

    @Override
    public void onBindViewHolder(ExampleViewHolder holder,
                                 int position) {
        final Item obj = getItem(position);
        Log.i(TAG, "Binding view holder: " + obj.getName());
        holder.data = obj;
        holder.title.setText(obj.getName());
    }

    @Override
    public long getItemId(int index) {
        return getItem(index).getId();
    }

    class ExampleViewHolder extends RecyclerView.ViewHolder {
        TextView title;
        public Item data;

        ExampleViewHolder(TextView view) {
            super(view);
            title = view;
        }
    }
}
