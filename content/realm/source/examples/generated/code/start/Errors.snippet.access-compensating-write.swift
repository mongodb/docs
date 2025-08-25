myApp.syncManager.errorHandler = { syncError, session in
    if let thisError = syncError as? SyncError {
        switch thisError.code {
        // ... additional SyncError.code cases ...
        case .writeRejected:
            if let compensatingWriteErrorInfo = thisError.compensatingWriteInfo {
                for anError in compensatingWriteErrorInfo {
                    print("A write was rejected with a compensating write error")
                    print("The write to object type: \(anError.objectType)")
                    print("With primary key of: \(anError.primaryKey)")
                    print("Was rejected because: \(anError.reason)")
                }
            }
        }
    }
}
