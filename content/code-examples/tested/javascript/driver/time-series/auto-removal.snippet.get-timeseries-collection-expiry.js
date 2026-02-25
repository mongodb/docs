const collections = await database
  .listCollections({ name: 'weather24h' })
  .toArray();
if (collections.length > 0) {
  const collectionInfo = collections[0];
  return collectionInfo.options?.expireAfterSeconds;
}
