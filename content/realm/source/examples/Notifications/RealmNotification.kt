class MyActivity : Activity() {
    private lateinit var realm: Realm
    private lateinit var realmListener: RealmChangeListener<Realm>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        realm = Realm.getDefaultInstance()
        realmListener = RealmChangeListener {
            // ... do something with the updates (UI, etc.) ...
        }
        // Observe realm notifications.
        realm.addChangeListener(realmListener)
    }

    override fun onDestroy() {
        super.onDestroy()
        // Remove the listener.
        realm.removeChangeListener(realmListener)
        // Close the Realm instance.
        realm.close()
    }
}
