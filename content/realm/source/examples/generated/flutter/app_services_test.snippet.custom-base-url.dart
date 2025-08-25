// Specify a baseUrl to connect to a server other than the default
final appConfig =
    AppConfiguration(appId, baseUrl: Uri.parse('https://example.com'));

var app = App(appConfig);
