app.sync.getSession(config).addDownloadProgressListener(
    ProgressMode.INDEFINITELY) { progress ->
    Log.v("EXAMPLE", "Download progress: ${progress.fractionTransferred}")
}
