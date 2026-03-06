/*
 * Iterates over the provided projects and clusters, pausing those clusters.
 */
exports = async function () {

  // Supply project IDs and cluster names to pause
  const projectIDs = [
    {
      id: "<projectIdA>",
      names: [ "<clusterNameA>", "<clusterNameB>" ]
    },
    {
      id: "<projectIdB>",
      names: [ "<clusterNameC>" ]
    }
  ];

  // Set desired state
  const body = { paused: true };

  // Pause each cluster and log the response
  for (const project of projectIDs) {
    for (const cluster of project.names) {
      const result = await context.functions.execute(
        "modifyCluster",
        project.id,
        cluster,
        body,
      );
      console.log("Cluster " + cluster + ": " + EJSON.stringify(result));
    }
  }

  return "Clusters Paused";
};