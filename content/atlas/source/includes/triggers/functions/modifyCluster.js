/*
 * Modifies the cluster as defined by the `body` parameter.
 * See https://www.mongodb.com/docs/atlas/reference/api-resources-spec/v2/#tag/Clusters/operation/updateCluster
 */
exports = async function(projectID, clusterName, body) {

  // Easy testing from the console
  if (projectID === "Hello world!") {
    projectID   = "<projectId>";
    clusterName = "<clusterName>";
    body        = { paused: false };
  }

  // Retrieve headers to authenticate with a new access token, and define the request URL for the Atlas API endpoint
  const authHeaders = await context.functions.execute("getAuthHeaders");
  const requestUrl = `https://cloud.mongodb.com/api/atlas/v2/groups/${projectID}/clusters/${clusterName}`;

  // Build the argument for the HTTP request to the Atlas API to modify the cluster
  const arg = {
    url: requestUrl,
    headers: authHeaders.headers,
    body: JSON.stringify(body)
  };

  // The response body is a BSON.Binary object; parse it and return the modified cluster description
  const response = await context.http.patch(arg);
  if (response.body) {
     return EJSON.parse(response.body.text()); 
  } else {
     throw new Error(`No response body returned from Atlas API. Status code: ${response.status}`);
  }
};