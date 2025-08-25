realm.writeBlocking {
    copyToRealm(
        Company().apply {
            location = CustomGeoPoint(47.68, -122.35)
        }
    )
    copyToRealm(
        Company().apply {
            location = CustomGeoPoint(47.9, -121.85)
        }
    )
}
