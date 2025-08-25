for await (const change of plants.watch({
  filter: {
    operationType: "update",
    "fullDocument.type": "perennial",
  },
})) {
  // The change event will always represent a newly inserted perennial
  const { documentKey, fullDocument } = change;
  console.log(`new document: ${documentKey}`, fullDocument);
  break; // Exit async iterator
}
