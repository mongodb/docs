for await (const change of plants.watch()) {
  let breakAsyncIterator = false; // Later used to exit async iterator
  switch (change.operationType) {
    case "insert": {
      const { documentKey, fullDocument } = change;
      console.log(`new document: ${documentKey}`, fullDocument);
      breakAsyncIterator = true;
      break;
    }
    case "update": {
      const { documentKey, fullDocument } = change;
      console.log(`updated document: ${documentKey}`, fullDocument);
      breakAsyncIterator = true;
      break;
    }
    case "replace": {
      const { documentKey, fullDocument } = change;
      console.log(`replaced document: ${documentKey}`, fullDocument);
      breakAsyncIterator = true;
      break;
    }
    case "delete": {
      const { documentKey } = change;
      console.log(`deleted document: ${documentKey}`);
      breakAsyncIterator = true;
      break;
    }
  }
  if (breakAsyncIterator) break; // Exit async iterator
}
