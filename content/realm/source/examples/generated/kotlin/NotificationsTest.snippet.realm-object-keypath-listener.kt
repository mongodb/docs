runBlocking {
    // Query for the specific object you intend to listen to.
    val frodoQuery = realm.query(Character::class, "name == 'Frodo'").first()
    val observer = async {
        val frodoFlow = frodoQuery.asFlow(listOf("age"))
        frodoFlow.collect { changes: SingleQueryChange<Character> ->
            // Change listener stuff in here.
        }
    }
    // Changing a property whose key path you're not observing does not trigger a notification.
    realm.writeBlocking {
        findLatest(frodoObject)!!.species = "Ring Bearer"
    }

    // Changing a property whose key path you are observing triggers a notification.
    realm.writeBlocking {
        findLatest(frodoObject)!!.age = 52
    }
    // For this example, we send the object change to a Channel where we can verify the
    // changes we expect. In your application code, you might use the notification to
    // update the UI or take some other action based on your business logic.
    channel.receiveOrFail().let { objChange ->
        assertIs<UpdatedObject<*>>(objChange)
        assertEquals(1, objChange.changedFields.size)
        // Because we are observing only the `age` property, the change to
        // the `species` property does not trigger a notification.
        // The first notification we receive is a change to the `age` property.
        assertEquals("age", objChange.changedFields.first())
    }
    observer.cancel()
    channel.close()
}
