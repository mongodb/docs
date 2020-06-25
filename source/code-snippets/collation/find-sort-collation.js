collection.find({ city: "New York" }, { collation: { locale: "de" } })
  .sort({ name: 1 });
