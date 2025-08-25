// Create a `flexibleSyncConfiguration` with `initialSubscriptions`.
// We'll inject this configuration as an environment value to use when opening the realm
// in the next view, and the realm will open with these initial subscriptions.
let config = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
    let peopleSubscriptionExists = subs.first(named: "people")
    let dogSubscriptionExists = subs.first(named: "dogs")
    // Check whether the subscription already exists. Adding it more
    // than once causes an error.
    if (peopleSubscriptionExists != nil) && (dogSubscriptionExists != nil) {
        // Existing subscriptions found - do nothing
        return
    } else {
        // Add queries for any objects you want to use in the app
        // Linked objects do not automatically get queried, so you
        // must explicitly query for all linked objects you want to include.
        subs.append(QuerySubscription<Person>(name: "people"))
        subs.append(QuerySubscription<Dog>(name: "dogs"))
    }
})
