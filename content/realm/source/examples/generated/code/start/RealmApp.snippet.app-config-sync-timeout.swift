let syncTimeoutOptions = SyncTimeoutOptions(
    connectTimeout: 30000,
    connectionLingerTime: 5000,
    pingKeepalivePeriod: 10000,
    pongKeepaliveTimeout: 10000,
    fastReconnectLimit: 30000
)
let configuration = AppConfiguration(syncTimeouts: syncTimeoutOptions)

let app = App(id: YOUR_APP_SERVICES_APP_ID, configuration: configuration)
