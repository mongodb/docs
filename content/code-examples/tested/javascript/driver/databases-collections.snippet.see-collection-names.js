const names = database.listCollections({}, { nameOnly: true });
for await (const doc of names) {
  console.log(doc);
}
