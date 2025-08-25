user.get().logOutAsync( result -> {
    if (result.isSuccess()) {
        Log.v("AUTH", "Successfully logged out.");
    } else {
        Log.e("AUTH", result.getError().toString());
    }
});
