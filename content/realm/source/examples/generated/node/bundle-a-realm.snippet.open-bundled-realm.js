const copyConfig = {
  schema: [Car],
  path: "path/to/bundled/file.realm"
};
const copyRealm = await Realm.open(copyConfig);
