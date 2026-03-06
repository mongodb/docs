/*
 * Scales a single cluster up to a larger instance size.
 * This example scales an AWS cluster up to M30 in region US_EAST_1.
 */
exports = async function() {
  // Supply project ID and cluster name...
  const projectID   = "<projectId>";
  const clusterName = "<clusterName>";

  // Set the desired instance size and topology...
  const body = {
    replicationSpecs: [
      {
        regionConfigs: [
          {
            electableSpecs: {
              instanceSize: "M30", // for example, larger tier
              nodeCount: 3
            },
            priority:     7,
            providerName: "AWS",
            regionName:   "US_EAST_1"
          }
        ]
      }
    ]
  };

  // Scale up the cluster and log the response
  const result = await context.functions.execute(
    "modifyCluster",
    projectID,
    clusterName,
    body
  );
  console.log(EJSON.stringify(result));

  return clusterName + " scaled up";
};