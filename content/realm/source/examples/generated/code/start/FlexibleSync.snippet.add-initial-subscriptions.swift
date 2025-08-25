var flexSyncConfig = user.flexibleSyncConfiguration(initialSubscriptions: { subs in
    subs.append(
        QuerySubscription<Team> {
               $0.teamName == "Developer Education"
            })
})
