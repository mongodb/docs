var testActivity: Activity? = null
val scenario: ActivityScenario<BasicActivity>? =
    ActivityScenario.launch(BasicActivity::class.java)

// create a latch to force blocking for an async call to initialize realm
val setupLatch = CountDownLatch(1)

scenario?.onActivity{ activity: BasicActivity ->
    Realm.init(activity)
    testActivity = activity
    setupLatch.countDown() // unblock the latch await
}
