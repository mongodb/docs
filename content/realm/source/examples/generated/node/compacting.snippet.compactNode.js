const realm = new Realm("my.realm");

try {
  const compactSuccess = realm.compact();
} catch (err) {
  if (err instanceof Error) {
    // handle error for compacting
  }
}
