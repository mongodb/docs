// Refresh the token every 29 minutes
Timer.periodic(Duration(minutes: 29), (_) {
  app.currentUser?.refreshCustomData();
});
