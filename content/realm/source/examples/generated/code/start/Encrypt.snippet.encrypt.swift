// Generate a random encryption key
var key = Data(count: 64)
_ = key.withUnsafeMutableBytes { (pointer: UnsafeMutableRawBufferPointer) in
    SecRandomCopyBytes(kSecRandomDefault, 64, pointer.baseAddress!) }

// Configure for an encrypted realm
var config = Realm.Configuration(encryptionKey: key)

do {
    // Open the encrypted realm
    let realm = try Realm(configuration: config)
    // ... use the realm as normal ...
} catch let error as NSError {
    // If the encryption key is wrong, `error` will say that it's an invalid database
    fatalError("Error opening realm: \(error.localizedDescription)")
}
