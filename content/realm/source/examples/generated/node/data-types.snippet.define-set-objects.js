const characterSchema = {
  name: "Character",
  primaryKey: "_id",
  properties: {
    _id: "objectId",
    name: "string",
    levelsCompleted: "int<>",
    inventory: "string<>",
  },
};
