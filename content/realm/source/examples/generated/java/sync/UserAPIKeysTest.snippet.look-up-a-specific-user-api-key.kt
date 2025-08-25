val user = app.currentUser()
user!!.apiKeys.fetchAsync(api_key_id) { result ->
    if (result.isSuccess) {
        Log.v("EXAMPLE", "Successfully fetched API key: ${result.get()}")
    } else {
        Log.e("EXAMPLE", "Error fetching API key: ${result.error}")
    }
}
