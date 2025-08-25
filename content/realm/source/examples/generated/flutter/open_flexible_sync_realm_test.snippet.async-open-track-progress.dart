double progressEstimate = -1;
final realm = await Realm.open(config, onProgressCallback: (syncProgress) {
  progressEstimate = syncProgress.progressEstimate;
  print('Sync progress: ${progressEstimate * 100}% complete.');
  if (progressEstimate == 1.0) {
    // Transfer is complete
  }
});
