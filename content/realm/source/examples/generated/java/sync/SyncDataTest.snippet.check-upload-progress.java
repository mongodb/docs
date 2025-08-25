app.getSync().getSession(config).addUploadProgressListener(ProgressMode.INDEFINITELY, new ProgressListener() {
    @Override
    public void onChange(Progress progress) {
        Log.v("EXAMPLE", "Upload progress: " + progress.getFractionTransferred());
    }
});
