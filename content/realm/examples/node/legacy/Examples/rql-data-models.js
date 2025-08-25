import Realm from "realm";
import { ItemModel, ProjectModel } from "./schemas/rql-data-models";

describe("test models", () => {
  let realm;
  const config = {
    schema: [ItemModel, ProjectModel],
    path: "testing.realm",
  };
  beforeEach(async () => {
    realm = await Realm.open(config);
  });
  afterEach(() => {
    realm.write(() => {
      realm.deleteAll();
    });
    realm.close();
    expect(realm.isClosed).toBe(true);
  });
  afterAll(() => {
    Realm.deleteFile(config);
  });
  test("open realm with config", async () => {
    expect(realm.isClosed).toBe(false);
  });
  test("Can create object of Item type", () => {
    realm.write(() => {
      realm.create("Item", {
        id: new Realm.BSON.ObjectId(),
        name: "get coffee",
      });
    });
    const coffeeItem = realm.objects("Item")[0];
    expect(coffeeItem.id instanceof Realm.BSON.ObjectId).toBe(true);
    expect(coffeeItem.name).toBe("get coffee");
    expect(coffeeItem.isComplete).toBe(false);
  });
  test("Can create object of Project type", () => {
    realm.write(() => {
      const teaItem = realm.create("Item", {
        id: new Realm.BSON.ObjectId(),
        name: "get tea",
      });
      realm.create("Project", {
        id: new Realm.BSON.ObjectId(),
        name: "beverages",
        items: [teaItem],
      });
    });
    const bevProject = realm.objects("Project")[0];
    expect(bevProject.id instanceof Realm.BSON.ObjectId).toBe(true);
    expect(bevProject.name).toBe("beverages");
    expect(bevProject.items[0].name).toBe("get tea");
  });
});
