let config = Realm.Configuration(shouldCompactOnLaunch: { totalBytes, usedBytes in
    // totalBytes refers to the size of the file on disk in bytes (data + free space)
    // usedBytes refers to the number of bytes used by data in the file

    // Compact if the file is over 100MB in size and less than 50% 'used'
    let oneHundredMB = 100 * 1024 * 1024
    return (totalBytes > oneHundredMB) && (Double(usedBytes) / Double(totalBytes)) < 0.5
})
do {
    // Realm is compacted on the first open if the configuration block conditions were met.
    let realm = try Realm(configuration: config)
} catch {
    // handle error compacting or opening Realm
}
