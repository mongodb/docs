// Open a local realm file with a predefined Car object model
const realm = await Realm.open({
  schema: [Car],
});
