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
