app.getSync().getSession(config).addDownloadProgressListener(ProgressMode.INDEFINITELY, new ProgressListener() {
    @Override
    public void onChange(Progress progress) {
        Log.v("EXAMPLE", "Download progress: " + progress.getFractionTransferred());
    }
});
