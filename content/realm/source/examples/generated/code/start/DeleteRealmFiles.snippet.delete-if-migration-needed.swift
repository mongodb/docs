do {
    // Delete the realm if a migration would be required, instead of migrating it.
    // While it's useful during development, do not leave this set to `true` in a production app!
    let configuration = Realm.Configuration(deleteRealmIfMigrationNeeded: true)
    let realm = try Realm(configuration: configuration)
} catch {
    print("Error opening realm: \(error.localizedDescription)")
}
