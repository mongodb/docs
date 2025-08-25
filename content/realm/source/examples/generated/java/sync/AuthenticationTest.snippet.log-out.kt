user?.logOutAsync {
    if (it.isSuccess) {
        Log.v("AUTH", "Successfully logged out.")
    } else {
        Log.e("AUTH", it.error.toString())
    }
}
