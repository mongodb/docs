final userSubscription = user.changes.listen((changes) {
  changes.user; // the User being listened to
});
