Realm.getInstanceAsync(config, object : Realm.Callback() {
    override fun onSuccess(realm: Realm) {
        Log.v("EXAMPLE", "Successfully fetched realm instance.")
    }

    fun onError(e: java.lang.Exception) {
        Log.e("EXAMPLE", "Failed to get realm instance: $e")
    }
})
