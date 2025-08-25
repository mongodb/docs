const ids = [
  new BSON.ObjectId("631a072f75120729dc9223d9"),
  new BSON.ObjectId("631a0737c98f89f5b81cd24d"),
  new BSON.ObjectId("631a073c833a34ade21db2b2"),
];
const parameterizedQuery = realm.objects("Item").filtered("id IN $0", ids);
