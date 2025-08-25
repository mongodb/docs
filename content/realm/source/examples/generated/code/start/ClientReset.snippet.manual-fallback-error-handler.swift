func handleClientReset() {
    // Report the client reset error to the user, or do some custom logic.
}

do {
    let app = App(id: APP_ID)
    let user = try await app.login(credentials: Credentials.anonymous)
    var config = user.flexibleSyncConfiguration(clientResetMode: .recoverOrDiscardUnsyncedChanges())
    // If client recovery fails,
    app.syncManager.errorHandler = { error, session in
        guard let syncError = error as? SyncError else {
            fatalError("Unexpected error type passed to sync error handler! \(error)")
        }
        switch syncError.code {
        case .clientResetError:
            if let (path, clientResetToken) = syncError.clientResetInfo() {
                handleClientReset()
                SyncSession.immediatelyHandleError(clientResetToken, syncManager: app.syncManager)
            }
        default:
            // Handle other errors...
            ()
        }
    }
} catch {
    print("Error: \(error.localizedDescription)")
}
