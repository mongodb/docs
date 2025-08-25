val stream = realm.syncSession.progressAsFlow(
    Direction.UPLOAD, ProgressMode.CURRENT_CHANGES
)
stream.collect { progress ->
    if (progress.transferableBytes == progress.transferredBytes) {
        Log.i("Upload complete")
    }
}
