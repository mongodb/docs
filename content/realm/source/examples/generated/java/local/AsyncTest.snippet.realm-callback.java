Realm.getInstanceAsync(config, new Realm.Callback() {
    @Override
    public void onSuccess(@NotNull Realm realm) {
        Log.v("EXAMPLE", "Successfully fetched realm instance.");
    }
    public void onError(Exception e) {
        Log.e("EXAMPLE", "Failed to get realm instance: " + e);
    }
});
