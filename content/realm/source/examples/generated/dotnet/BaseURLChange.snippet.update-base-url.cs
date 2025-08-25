// Specify a baseURL to connect to a server other than the default.
// In this case, an Edge Server instance running on the device
var appConfig = new AppConfiguration(YOUR_APP_ID);
appConfig.BaseUri = new Uri("http://localhost:80");

var app = App.Create(appConfig);

// ... log in a user and use the app ...

// Update the base URL back to the default.
#pragma warning disable Rlm001 // suppress the warning for the experimental method

await app.UpdateBaseUriAsync(new Uri("https://services.cloud.mongodb.com"));

#pragma warning restore Rlm001
