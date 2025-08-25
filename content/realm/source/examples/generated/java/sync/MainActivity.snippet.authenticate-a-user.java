Credentials credentials = Credentials.anonymous();

app.loginAsync(credentials, result -> {
    if (result.isSuccess()) {
        Log.v("QUICKSTART", "Successfully authenticated anonymously.");
        User user = app.currentUser();

        String partitionValue = "My Project";
        SyncConfiguration config = new SyncConfiguration.Builder(
                user,
                partitionValue)
            .build();

        uiThreadRealm = Realm.getInstance(config);

        addChangeListenerToRealm(uiThreadRealm);

        FutureTask<String> task = new FutureTask(new BackgroundQuickStart(app.currentUser()), "test");
        ExecutorService executorService = Executors.newFixedThreadPool(2);
        executorService.execute(task);

    } else {
        Log.e("QUICKSTART", "Failed to log in. Error: " + result.getError());
    }
});
