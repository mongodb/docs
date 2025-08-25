realm.subscriptions.update { subscriptions ->
    // to update an unnamed subscription, remove it from the
    // subscription set, then add your new query to the set
    val mySubscription =
        subscriptions.find(
            realm.where(
                Frog::class.java
            ).equalTo(
                "species",
                "cane toad"
            )
        )
    subscriptions.remove(mySubscription)
    subscriptions.addOrUpdate(
        Subscription.create(
            realm.where(Frog::class.java)
                .equalTo(
                    "species",
                    "albino cane toad"
                )
        )
    )
}
