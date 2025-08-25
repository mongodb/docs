// open a realm asynchronously
Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully fetched realm instance")

        CoroutineScope(Dispatchers.Main).launch {
            // asynchronous transaction
            realm.executeTransactionAwait(Dispatchers.IO) { transactionRealm: Realm ->
                if (isActive) {
                    val item = transactionRealm.createObject<Item>()
                }
            }
        }
        // asynchronous query
        val items: Flow<RealmResults<Item>> = realm.where<Item>().findAllAsync().toFlow()
    }

    fun onError(e: Exception) {
        Log.e("EXAMPLE", "Failed to get realm instance: $e")
    }
})
