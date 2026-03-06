/*
 * Generate API request headers with a new Service Account Access Token.
 */
exports = async function getAuthHeaders() {

  // Get stored credentials
  clientId = context.values.get("AtlasClientId");
  clientSecret = context.values.get("AtlasClientSecret");

  // Throw an error if credentials are missing
  if (!clientId || !clientSecret) {
    throw new Error("Authentication credentials not found. Set AtlasClientId/AtlasClientSecret (service account auth credentials).");
  }

  // Define the argument for the HTTP request to get the access token
  const tokenUrl = "https://cloud.mongodb.com/api/oauth/token";
  const credentials = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const arg = {
    url: tokenUrl,
    headers: {
      "Authorization": [ `Basic ${credentials}` ],
      "Content-Type": [ "application/x-www-form-urlencoded" ]
    },
    body: "grant_type=client_credentials"
  }

  // The response body is a BSON.Binary object; parse it to extract the access token 
  const response = await context.http.post(arg);
  const tokenData = JSON.parse(response.body.text());
  const accessToken = tokenData.access_token;

  // Define the Accept header with the resource version from env var or default to latest stable
  const resourceVersion = context.environment.ATLAS_API_VERSION || "2025-03-12";
  const acceptHeader = `application/vnd.atlas.${resourceVersion}+json`;

  // Return the access token as headers for future API calls
  return {
   headers: {
     "Authorization": [ `Bearer ${accessToken}` ],
     "Accept": [ acceptHeader ],
     "Accept-Encoding": [ "bzip, deflate" ],
     "Content-Type": [ "application/json" ]
   }
  };
}
