const colls = database.listCollections();
for await (const doc of colls) {
  console.log(doc);
}
