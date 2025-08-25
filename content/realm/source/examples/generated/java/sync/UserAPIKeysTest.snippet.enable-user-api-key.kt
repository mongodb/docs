val user = app.currentUser()
user!!.apiKeys.enableAsync(api_key_id) { result ->
    if (result.isSuccess) {
        Log.v("EXAMPLE", "Successfully enabled API key.")
    } else {
        Log.e("EXAMPLE", "Error fetching API key: ${result.error}")
    }
}
