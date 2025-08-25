import XCTest
import RealmSwift

class Encrypt: XCTestCase {
    func testEncrypt() {
        // :snippet-start: encrypt
        // Generate a random encryption key
        var key = Data(count: 64)
        _ = key.withUnsafeMutableBytes { (pointer: UnsafeMutableRawBufferPointer) in
            SecRandomCopyBytes(kSecRandomDefault, 64, pointer.baseAddress!) }

        // Configure for an encrypted realm
        var config = Realm.Configuration(encryptionKey: key)

        // :remove-start:
        // This is not required for the example, but is required for the test.
        // Omit from the example.
        config.fileURL!.deleteLastPathComponent()
        config.fileURL!.appendPathComponent("encryptedRealm")
        config.fileURL!.appendPathExtension("realm")
        // :remove-end:
        do {
            // Open the encrypted realm
            let realm = try Realm(configuration: config)
            // ... use the realm as normal ...
        } catch let error as NSError {
            // If the encryption key is wrong, `error` will say that it's an invalid database
            fatalError("Error opening realm: \(error.localizedDescription)")
        }
        // :snippet-end:
        try! FileManager().removeItem(at: config.fileURL!)
    }

    func testStoreInKeychain() {
        // :snippet-start: store-in-keychain
        // Retrieve the existing encryption key for the app if it exists or create a new one
        func getKey() -> Data {
            // Identifier for our keychain entry - should be unique for your application
            let keychainIdentifier = "io.Realm.EncryptionExampleKey"
            let keychainIdentifierData = keychainIdentifier.data(using: String.Encoding.utf8, allowLossyConversion: false)!

            // First check in the keychain for an existing key
            var query: [NSString: AnyObject] = [
                kSecClass: kSecClassKey,
                kSecAttrApplicationTag: keychainIdentifierData as AnyObject,
                kSecAttrKeySizeInBits: 512 as AnyObject,
                kSecReturnData: true as AnyObject
            ]

            // To avoid Swift optimization bug, should use withUnsafeMutablePointer() function to retrieve the keychain item
            // See also: http://stackoverflow.com/questions/24145838/querying-ios-keychain-using-swift/27721328#27721328
            var dataTypeRef: AnyObject?
            var status = withUnsafeMutablePointer(to: &dataTypeRef) { SecItemCopyMatching(query as CFDictionary, UnsafeMutablePointer($0)) }
            if status == errSecSuccess {
                // swiftlint:disable:next force_cast
                return dataTypeRef as! Data
            }

            // No pre-existing key from this application, so generate a new one
            // Generate a random encryption key
            var key = Data(count: 64)
            key.withUnsafeMutableBytes({ (pointer: UnsafeMutableRawBufferPointer) in
                let result = SecRandomCopyBytes(kSecRandomDefault, 64, pointer.baseAddress!)
                assert(result == 0, "Failed to get random bytes")
            })

            // Store the key in the keychain
            query = [
                kSecClass: kSecClassKey,
                kSecAttrApplicationTag: keychainIdentifierData as AnyObject,
                kSecAttrKeySizeInBits: 512 as AnyObject,
                kSecValueData: key as AnyObject
            ]

            status = SecItemAdd(query as CFDictionary, nil)
            assert(status == errSecSuccess, "Failed to insert the new key in the keychain")

            return key
        }

        // ...
        // Use the getKey() function to get the stored encryption key or create a new one
        var config = Realm.Configuration(encryptionKey: getKey())

        // :remove-start:
        // This is not required for the example, but is required for the test.
        // Omit from the example.
        config.fileURL!.deleteLastPathComponent()
        config.fileURL!.appendPathComponent("encryptedRealm")
        config.fileURL!.appendPathExtension("realm")
        // :remove-end:
        do {
            // Open the realm with the configuration
            let realm = try Realm(configuration: config)

            // Use the realm as normal

        } catch let error as NSError {
            // If the encryption key is wrong, `error` will say that it's an invalid database
            fatalError("Error opening realm: \(error)")
        }
        // :snippet-end:
        try! FileManager().removeItem(at: config.fileURL!)
    }

    func testBackgroundRefreshEncryption() {
        // :snippet-start: background-app-refresh-encryption
        let realm = try! Realm()

        // Get the realm file's parent directory
        let folderPath = realm.configuration.fileURL!.deletingLastPathComponent().path

        // Disable file protection for this directory after the user has unlocked the device once
        try! FileManager.default.setAttributes([FileAttributeKey.protectionKey: FileProtectionType.completeUntilFirstUserAuthentication],
                                               ofItemAtPath: folderPath)
        // :snippet-end:
    }
}
