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
                realm.where(Item.class).findAll());
recyclerView.setAdapter(adapter);
ViewGroup.LayoutParams layoutParams =
        new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT);
activity.addContentView(recyclerView, layoutParams);
