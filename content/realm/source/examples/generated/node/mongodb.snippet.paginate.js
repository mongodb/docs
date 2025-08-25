// Paginates through list of plants
// in ascending order by plant name (A -> Z)
async function paginateCollectionAscending(
  collection,
  nPerPage,
  startValue
) {
  const pipeline = [{ $sort: { name: 1 } }, { $limit: nPerPage }];
  // If not starting from the beginning of the collection,
  // only match documents greater than the previous greatest value.
  if (startValue !== undefined) {
    pipeline.unshift({
      $match: {
        name: { $gt: startValue },
      },
    });
  }
  const results = await collection.aggregate(pipeline);

  return results;
}
// Number of results to show on each page
const resultsPerPage = 3;

const pageOneResults = await paginateCollectionAscending(
  plants,
  resultsPerPage
);

const pageTwoStartValue = pageOneResults[pageOneResults.length - 1].name;
const pageTwoResults = await paginateCollectionAscending(
  plants,
  resultsPerPage,
  pageTwoStartValue
);

// ... can keep paginating for as many plants as there are in the collection
