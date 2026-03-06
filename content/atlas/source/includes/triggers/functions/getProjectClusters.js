/*
 * Returns an array of the clusters for the supplied project ID.
 * See https://docs.atlas.mongodb.com/reference/api/clusters-get-all/
 *
 * Returns an array of objects. See the API documentation for details.
 * 
 */
exports = async function(projectId) {
  
  if (projectId == "Hello world!") { // Easy testing from the console
    projectId = "<projectId>"
  }
  
  // Retrieve headers to authenticate with a new access token, and define the request URL for the Atlas API endpoint
  const authHeaders = await context.functions.execute("getAuthHeaders");
  const requestUrl = `https://cloud.mongodb.com/api/atlas/v2/groups/${projectId}/clusters`;
  
  // Build the argument for the HTTP request to the Atlas API to get all clusters in the project
  const arg = {
    url: requestUrl,
    headers: authHeaders.headers
  };

  // The response body is a BSON.Binary object; parse it and return the `results` array, which contains the list of clusters for the project
  response = await context.http.get(arg);
  return EJSON.parse(response.body.text()).results; 
};