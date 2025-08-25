// Specify a baseURL to connect to a server other than the default.
// In this case, an Edge Server instance running on the device.
let configuration = AppConfiguration(baseURL: "http://localhost:80")
let edgeApp = App(id: EDGE_SERVER_APP_ID, configuration: configuration)

// You can check the `baseURL` of an app to define app logic.
if edgeApp.baseURL == "http://localhost:80" {
    print("Client app is currently connected to a local Edge Server instance")
}
// ... log in a user and use the app...
// ... some time later...

try await edgeApp.updateBaseUrl(to: "https://services.cloud.mongodb.com")
