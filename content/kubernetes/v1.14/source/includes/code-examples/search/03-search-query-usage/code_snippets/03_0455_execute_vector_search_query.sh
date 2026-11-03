kubectl exec -i --context "${K8S_CTX}" -n "${MDB_NS}" mongodb-tools-pod -- \
  mongosh --quiet "${MDB_CONNECTION_STRING}" <<'EOF'
use sample_mflix;

const sourceMovieTitle = "Back to the Future Part II";
const sourceMovie = db.embedded_movies.findOne(
  {
    title: sourceMovieTitle,
    plot_embedding_voyage_3_large: { $exists: true }
  },
  { plot_embedding_voyage_3_large: 1 }
);
if (!sourceMovie) {
  throw new Error(`No source movie named "${sourceMovieTitle}" contains plot_embedding_voyage_3_large`);
}
print(`Finding movies with plots similar to "${sourceMovieTitle}"`);
const queryVector = sourceMovie.plot_embedding_voyage_3_large;

db.embedded_movies.aggregate([
  {
    $vectorSearch: {
      index: "vector_index",
      path: "plot_embedding_voyage_3_large",
      queryVector,
      numCandidates: 100,
      limit: 6
    }
  },
  { $match: { _id: { $ne: sourceMovie._id } } },
  { $limit: 5 },
  {
    $project: {
      _id: 0,
      title: 1,
      year: 1,
      plot: 1,
      score: { $meta: "vectorSearchScore" }
    }
  }
]);
EOF
