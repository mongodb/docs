var config = user.configuration(partitionValue: "Some partition value")
config.eventConfiguration = EventConfiguration(metadata: ["username": "Jason Bourne"], syncUser: user, partitionPrefix: "event-")
let realm = try! Realm(configuration: config)
let events = realm.events!
let updateUsernameScope = events.beginScope(activity: "Update username")
// Call some function that updates the user's username
updateUsername()
updateUsernameScope.commit()
// Update the metadata you supplied with the initial EventConfiguration
events.updateMetadata(["username": "John Michael Kane"])
