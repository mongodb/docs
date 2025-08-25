AtomicReference<Activity> testActivity = new AtomicReference<Activity>();
ActivityScenario<BasicActivity> scenario = ActivityScenario.launch(BasicActivity.class);

// create a latch to force blocking for an async call to initialize realm
CountDownLatch setupLatch = new CountDownLatch(1);

scenario.onActivity(activity -> {
    Realm.init(activity);
    testActivity.set(activity);
    setupLatch.countDown(); // unblock the latch await
});

// block until we have an activity to run tests on
try {
    Assert.assertTrue(setupLatch.await(1, TimeUnit.SECONDS));
} catch (InterruptedException e) {
    Log.e("EXAMPLE", e.getMessage());
}
