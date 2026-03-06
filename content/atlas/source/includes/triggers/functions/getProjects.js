/*
 * Returns an array of the projects in the organization
 * See https://docs.atlas.mongodb.com/reference/api/project-get-all/
 *
 * Returns an array of objects, e.g.
 *
 * {
 * "clusterCount": {
 *      "$numberInt": "1"
 *    },
 *    "created": "2021-05-11T18:24:48Z",
 *    "id": "609acbef1b76b53fcd37c8e1",
 *    "links": [
 *      {
 *        "href": "https://cloud.mongodb.com/api/atlas/v1.0/groups/609acbef1b76b53fcd37c8e1",
 *        "rel": "self"
 *      }
 *    ],
 *    "name": "mg-training-sample",
 *    "orgId": "5b4e2d803b34b965050f1835"
 *  }
  *
 */
exports = async function() {
  
  // Retrieve headers to authenticate with a new access token, and define the request URL for the Atlas API endpoint
  const authHeaders = await context.functions.execute("getAuthHeaders");
  const requestUrl = `https://cloud.mongodb.com/api/atlas/v2/groups`;

  // Build the argument for the HTTP request to the Atlas API to get all projects in the organization
  const arg = {
    url: requestUrl,
    headers: authHeaders.headers
  };

  // The response body is a BSON.Binary object; parse it and return the `results` array, which contains the list of projects for the organization
  response = await context.http.get(arg);
  return EJSON.parse(response.body.text()).results; 
};