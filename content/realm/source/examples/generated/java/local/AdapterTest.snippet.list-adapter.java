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
                realm.where(Item.class).findAll());
listView.setAdapter(adapter);
ViewGroup.LayoutParams layoutParams =
        new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT);
activity.addContentView(listView, layoutParams);
