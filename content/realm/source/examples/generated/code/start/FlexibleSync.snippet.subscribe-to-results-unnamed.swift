let realm = try await Realm(configuration: flexSyncConfig)
let results = try await realm.objects(Task.self)
    .where { $0.progressMinutes >= 60 }.subscribe()
// Go on to work with subscribed results
