final stream = realm.syncSession.getProgressStream(
    ProgressDirection.upload, ProgressMode.forCurrentlyOutstandingWork);
double progressEstimate = -1;
late StreamSubscription streamListener;
streamListener = stream.listen((syncProgressEvent) {
  progressEstimate = syncProgressEvent.progressEstimate;

  if (progressEstimate < 1.0) {
    print('Upload progress: ${progressEstimate * 100}%');
  }
}, onDone: () {
  print('Upload progress: ${progressEstimate * 100}%');
  print("Upload complete");
}, onError: (error) {
  print("An error occurred: $error");
  streamListener.cancel();
});
