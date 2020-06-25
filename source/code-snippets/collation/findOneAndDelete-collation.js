// start findOneAndDelete example without collation
await collection.findOneAndDelete({ a: { $gt: "100" } });
// end findOneAndDelete example without collation

// start findOneAndDelete example with collation
collection.findOneAndDelete(
  { a: { $gt: "100" } },
  { collation: { locale: "en", numericOrdering: true } },
);
// end findOneAndDelete example with collation
