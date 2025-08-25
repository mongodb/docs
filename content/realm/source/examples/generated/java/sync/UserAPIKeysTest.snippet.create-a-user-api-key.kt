val user = app.currentUser()
user!!.apiKeys.createAsync("Name-of-the-API-Key") { result ->
    if (result.isSuccess) {
        Log.v("EXAMPLE", "Successfully created API key: ${result.get().value}")
    } else {
        Log.e("EXAMPLE", "Error creating API key: ${result.error}")
    }
}
