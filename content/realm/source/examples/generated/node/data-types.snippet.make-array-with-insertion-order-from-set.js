function updateSetAndOrderedSetArray(set, orderedArray, value) {
  const oldSize = set.size;
  set.add(value);
  if (set.size > oldSize) {
    orderedArray.push(value);
  }
}

let playerOne;
let levelsCompletedInOrder = [];
const realm = await Realm.open({
  path: "realm-files/data-type-realm",
  schema: [characterSchema],
});
realm.write(() => {
  playerOne = realm.create("Character", {
    _id: new BSON.ObjectId(),
    name: "PlayerOne",
    inventory: ["potion", "wand", "spell book"],
    levelsCompleted: [],
  });
});
realm.write(() => {
  updateSetAndOrderedSetArray(
    playerOne.levelsCompleted,
    levelsCompletedInOrder,
    5
  );
});
realm.write(() => {
  updateSetAndOrderedSetArray(
    playerOne.levelsCompleted,
    levelsCompletedInOrder,
    12
  );
});
realm.write(() => {
  updateSetAndOrderedSetArray(
    playerOne.levelsCompleted,
    levelsCompletedInOrder,
    2
  );
});
realm.write(() => {
  updateSetAndOrderedSetArray(
    playerOne.levelsCompleted,
    levelsCompletedInOrder,
    7
  );
});
console.log("set ordered", Array.from(playerOne.levelsCompleted)); // not necessarily [5, 12, 2, 7]
console.log("insert ordered", levelsCompletedInOrder); // [5, 12, 2, 7]
// close the realm
realm.close();
