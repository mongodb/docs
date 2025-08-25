runBlocking {
    // Query for the specific object you intend to listen to.
    val fellowshipQuery = realm.query(Fellowship::class).first()
    val observer = async {
        val fellowshipFlow = fellowshipQuery.asFlow(listOf("members.age"))
        fellowshipFlow.collect { changes: SingleQueryChange<Fellowship> ->
            // Change listener stuff in here.
        }
    }

    // Changing a property whose nested key path you are observing triggers a notification.
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
