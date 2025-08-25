autoreleasepool {
    // all Realm usage here -- explicitly guarantee
    // that all realm objects are deallocated
    // before deleting the files
}
do {
    let app = App(id: APPID)
    let user = try await app.login(credentials: Credentials.anonymous)
    var configuration = user.flexibleSyncConfiguration()
    _ = try Realm.deleteFiles(for: configuration)
} catch {
    // handle error
}
