let realm = try! Realm()
let readEmails = realm.objects(Email.self).where {
    $0.read == true
}
realm.writeAsync(readEmails) { (realm, readEmails) in
    guard let readEmails = readEmails else {
        // Already deleted
        return
    }
    realm.delete(readEmails)
}
