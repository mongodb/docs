// Open the default realm
let defaultRealm = try! Realm()

// Open the realm with a specific file URL, for example a username
let username = "GordonCole"
var config = Realm.Configuration.defaultConfiguration
config.fileURL!.deleteLastPathComponent()
config.fileURL!.appendPathComponent(username)
config.fileURL!.appendPathExtension("realm")
let realm = try! Realm(configuration: config)
