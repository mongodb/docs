const config = {
  schema: [Car],
  path: "testing.realm",
};
let realm;
beforeEach(async () => {
  realm = await Realm.open(config);
});
afterEach(() => {
  if (!realm.isClosed) {
    realm.close();
  }
  if (config) {
    Realm.deleteFile(config);
  }
});
test("Close a Realm", async () => {
  expect(realm.isClosed).toBe(false);
  realm.close();
  expect(realm.isClosed).toBe(true);
});
