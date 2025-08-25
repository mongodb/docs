realm.write(() => {
  // remove the compass from playerOne's inventory by calling the
  // `delete()` method of the Realm Set object within a write transaction
  playerOne.inventory.delete("compass");
});

