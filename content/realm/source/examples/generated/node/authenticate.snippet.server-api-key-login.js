// Get the API key from the local environment
const apiKey = process.env?.appServicesApiKey;

if (!apiKey) {
  throw new Error("Could not find a Server API Key.");
}

// Create an api key credential
const credentials = Realm.Credentials.apiKey(apiKey);
const user = await app.logIn(credentials);
