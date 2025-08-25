// A block called after a client reset error is detected, but before the
// client recovery process is executed.
// This block could be used for any custom logic, reporting, debugging etc.
// This is one example, but your usage may vary.
let beforeClientResetBlock: (Realm) -> Void = { before in
    var recoveryConfig = Realm.Configuration()
    recoveryConfig.fileURL = myRecoveryPath
    do {
       try before.writeCopy(configuration: recoveryConfig)
        // The copied realm could be used later for recovery, debugging, reporting, etc.
     } catch {
            // handle error
     }
}

// A block called after the client recovery process has executed.
// This block could be used for custom recovery, reporting, debugging etc.
// This is one example, but your usage may vary.
let afterClientResetBlock: (Realm, Realm) -> Void = { before, after in
    //     let res = after.objects(myClass.self)
    //     if (res.filter("primaryKey == %@", object.primaryKey).first != nil) {
    //         // ...custom recovery logic...
    //     } else {
    //         // ...custom recovery logic...
    //     }
    // }
}

do {
    let app = App(id: YOUR_APP_SERVICES_APP_ID)
    let user = try await app.login(credentials: Credentials.anonymous)
    var configuration = user.flexibleSyncConfiguration(clientResetMode:
                                                        .recoverOrDiscardUnsyncedChanges(
                                                            beforeReset: beforeClientResetBlock,
                                                            afterReset: afterClientResetBlock))
} catch {
    print("Error logging in user: \(error.localizedDescription)")
}
