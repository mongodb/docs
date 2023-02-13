// start findOneAndDelete example without collation
await myColl.findOneAndDelete({ a: { $gt: "100" } });
// end findOneAndDelete example without collation

// start findOneAndDelete example with collation
myColl.findOneAndDelete(
  { a: { $gt: "100" } },
  { collation: { locale: "en", numericOrdering: true } },
);
// end findOneAndDelete example with collation
