// Search for the subscription by query
val subscription =
    realm.subscriptions.findByQuery(
        realm.query<Team>("teamName == $0", "Developer Education")
    )

// Remove the returned subscription and add the updated query
if (subscription != null) {
    realm.subscriptions.update {
        remove(subscription)
        add(
            realm.query<Team>("teamName == $0", "DevEd"),
            "team_developer_education"
        )
    }
}
