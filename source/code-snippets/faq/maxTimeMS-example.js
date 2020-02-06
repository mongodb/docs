// Execute a find command
collection
  .find({ $where: "sleep(100) || true" })
  .maxTimeMS(50)
  .count(function(err, count) {});
