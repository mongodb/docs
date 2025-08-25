app.sync.getSession(config).addUploadProgressListener(
    ProgressMode.INDEFINITELY) { progress ->
    Log.v("EXAMPLE", "Upload progress: ${progress.fractionTransferred}")
}
