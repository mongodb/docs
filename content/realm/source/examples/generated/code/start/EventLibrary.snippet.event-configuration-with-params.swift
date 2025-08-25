let eventSyncUser = try await app.login(credentials: Credentials.anonymous)
var config = user.configuration(partitionValue: "Some partition value")
config.eventConfiguration = EventConfiguration(metadata: ["username": "Jason Bourne"], syncUser: eventSyncUser, partitionPrefix: "event-")
