final class ErrorHandler: ObservableObject {
    @Published var error: Swift.Error?

    init(app: RealmSwift.App) {
        // Sync Manager listens for sync errors.
        app.syncManager.errorHandler = { error, syncSession in
            if let error = error as? SyncError {
                /* Handle specific SyncError cases, or use a switch
                 * statement to handle all Sync error codes.
                 * In this case, ignore a .connectionFailed error and
                 * continue executing the app code. */
                if error.code == .connectionFailed {
                    return
                }
                self.error = error
            } else if let error = error as? POSIXError {
                /* The error handler may also report NSError types to
                 * allow for error handling in a platform-idiomatic way.
                 * In this case, handle a connection timeout error as
                 * an .ETIMEDOUT error in the POSIXError domain. */
                if error.code == .ETIMEDOUT {
                    return
                }
                self.error = error
            }
        }
    }
}
