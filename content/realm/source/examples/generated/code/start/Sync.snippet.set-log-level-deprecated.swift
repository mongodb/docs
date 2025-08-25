// This code example shows how to set the log level
// in Realm Swift 10.38.3 and lower. For 10.39.0 and higher,
// use the `Logger` API.
// Access your app
let app = App(id: YOUR_APP_SERVICES_APP_ID)

// Access the sync manager for the app
let syncManager = app.syncManager

// Set the logger to provide debug logs
syncManager.logLevel = .debug
