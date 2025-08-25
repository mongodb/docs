val user = app.currentUser()
user!!.apiKeys.deleteAsync(api_key_id) { result ->
    if (result.isSuccess) {
        Log.v("EXAMPLE", "Successfully deleted API key.")
    } else {
        Log.e("EXAMPLE", "Error deleting API key: ${result.error}")
    }
}
