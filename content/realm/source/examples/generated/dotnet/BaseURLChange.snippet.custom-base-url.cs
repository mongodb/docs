// Specify a base URL to connect to a server other than the default.
var appConfig = new AppConfiguration(YOUR_APP_ID);
appConfig.BaseUri = new Uri("http://localhost:80");

var app = App.Create(appConfig);
