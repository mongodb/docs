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
