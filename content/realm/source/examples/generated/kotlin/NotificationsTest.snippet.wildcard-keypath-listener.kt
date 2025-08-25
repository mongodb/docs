runBlocking {
    // Query for the specific object you intend to listen to.
    val fellowshipQuery = realm.query(Fellowship::class).first()
    val observer = async {
        // Use a wildcard to observe changes to any key path at the level of the wildcard.
        val fellowshipFlow = fellowshipQuery.asFlow(listOf("members.*"))
        fellowshipFlow.collect { changes: SingleQueryChange<Fellowship> ->
            // Change listener stuff in here.
        }
    }

    // Changing any property at the level of the key path wild card triggers a notification.
    val fellowship = fellowshipQuery.find()!!
    realm.writeBlocking {
        findLatest(fellowship)!!.members[0].age = 52
    }
    // For this example, we send the object change to a Channel where we can verify the
    // changes we expect. In your application code, you might use the notification to
    // update the UI or take some other action based on your business logic.
    channel.receiveOrFail().let { objChange ->
        assertIs<UpdatedObject<*>>(objChange)
        assertEquals(1, objChange.changedFields.size)
        // While you can watch for updates to a nested property, the notification
        // only reports the change on the top-level property. In this case, there
        // was a change to one of the elements in the `members` property, so `members`
        // is what the notification reports - not `age`.
        assertEquals("members", objChange.changedFields.first())
    }
    observer.cancel()
    channel.close()
}
