/*
 * Scales a single cluster down to a smaller instance size.
 * This example scales an AWS cluster down to M10 in region US_EAST_1.
 */
exports = async function() {
  const projectID   = "<projectId>";
  const clusterName = "<clusterName>";

  const body = {
    replicationSpecs: [
      {
        regionConfigs: [
          {
            electableSpecs: {
              instanceSize: "M10", // for example, smaller tier
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

  // Scale down the cluster and log the response
  const result = await context.functions.execute(
    "modifyCluster",
    projectID,
    clusterName,
    body
  );
  console.log(EJSON.stringify(result));

  return clusterName + " scaled down";
};