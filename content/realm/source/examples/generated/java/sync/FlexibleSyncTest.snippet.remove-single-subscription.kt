realm.subscriptions.update { subscriptions ->
    val mySubscription =
        subscriptions.find("mySubscription")
    subscriptions.remove(mySubscription)
}
