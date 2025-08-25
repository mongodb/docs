// Add a subscription named "team_dev_ed"
realm.subscriptions.update { realm ->
        add(
            realm.query<Team>("teamName == $0", "Developer Education"),
            name = "team_dev_ed"
        )
    }
