let realm = try! Realm()

// Get the realm file's parent directory
let folderPath = realm.configuration.fileURL!.deletingLastPathComponent().path

// Disable file protection for this directory after the user has unlocked the device once
try! FileManager.default.setAttributes([FileAttributeKey.protectionKey: FileProtectionType.completeUntilFirstUserAuthentication],
                                       ofItemAtPath: folderPath)
