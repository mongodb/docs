const originalPath = path.join(__dirname, "original.realm");
const originalConfig = {
  schema: [Car],
  path: originalPath,
};
const originalRealm = await Realm.open(originalConfig);

const copyPath = path.join(__dirname, "copy.realm");
originalRealm.writeCopyTo(copyPath);
