final user = app.currentUser!;
final updatedTimestamp = DateTime.now().millisecondsSinceEpoch;
final updatedCustomUserData = {
  "userId": user.id,
  "favoriteFood": "pizza",
  "lastUpdated": updatedTimestamp
};

final functionResponse = await user.functions
    .call("writeCustomUserData", [updatedCustomUserData]);

// Contains the `updatedCustomUserData` object just added
// in the above Atlas Function call
final customUserData = await user.refreshCustomData();
