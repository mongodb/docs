let syncSession = realm.syncSession!
let token = syncSession.addProgressNotification(
    for: .upload, mode: .forCurrentlyOutstandingWork) { (progress) in
        
        let progressEstimate = progress.progressEstimate
        let transferPercent = progressEstimate * 100
        
        print("Uploaded (\(transferPercent)%)")
    }
