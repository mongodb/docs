// start-create-index
await mongoVector.createIndex({
  indexName: "vector_index",
  autoEmbed: { model: "voyage-4" }, // Voyage AI embedding model
  filterFields: ["year"],
});

// Waits for the index to finish building before writing to it
await mongoVector.waitForIndexReady({
  indexName: "vector_index",
  timeoutMs: 300000,
});
// end-create-index

// start-upsert
await mongoVector.upsert({
  indexName: "vector_index",
  documents: [
    "A lonely astronaut adrift near a strange ocean planet.",
    "A heist crew robs a bank vault in Paris.",
  ],
  metadata: [{ year: 1972 }, { year: 2001 }],
});
// end-upsert

// start-query
const results = await mongoVector.query({
  indexName: "vector_index",
  queryText: "space opera about isolation",
  topK: 5,
  filter: { year: { $gt: 1970 } },
});
// end-query

// start-query-filter
const filteredResults = await mongoVector.query({
  indexName: "vector_index",
  queryText: "heist movie set in Paris",
  topK: 10,
  filter: {
    year: { $gte: 1990, $lte: 2010 },
  },
});
// end-query-filter
