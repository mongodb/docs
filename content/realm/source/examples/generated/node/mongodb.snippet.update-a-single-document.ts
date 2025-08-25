type UpdateResult = Realm.Services.MongoDB.UpdateResult<BSON.ObjectId>;
const result = await plants.updateOne(
  { name: "petunia" },
  { $set: { sunlight: "partial" } }
);
console.log(result);
