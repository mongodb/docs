realm.subscriptions.update { subscriptions ->
    // to update a named subscription, create a replacement with
    // the same name and add it to the subscription set
    subscriptions.addOrUpdate(
        Subscription.create(
            "my frog subscription",
            realm.where(Frog::class.java)
                .equalTo(
                    "name",
                    "Benedict Cumberburger"
                )
        )
    )
}
