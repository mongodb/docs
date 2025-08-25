let playerOne, playerTwo;
realm.write(() => {
  playerOne = realm.create("Character", {
    _id: new BSON.ObjectId(),
    name: "PlayerOne",
    inventory: ["elixir", "compass", "glowing shield"],
    levelsCompleted: [4, 9],
  });
  playerTwo = realm.create("Character", {
    _id: new BSON.ObjectId(),
    name: "PlayerTwo",
    inventory: ["estus flask", "gloves", "rune"],
    levelsCompleted: [1, 2, 5, 24],
  });
});
