realm.write(() => {
  // clear all data from the inventory slot of playerTwo by calling
  // the `clear()` method of the Realm Set object in a write transaction
  playerTwo.inventory.clear();
});
