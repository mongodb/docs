// Specify a baseURL to connect to a server other than the default.
// In this case, an Edge Server instance running on the device.
let configuration = AppConfiguration(baseURL: "http://localhost:80")

let edgeApp = App(id: EDGE_SERVER_APP_ID, configuration: configuration)
