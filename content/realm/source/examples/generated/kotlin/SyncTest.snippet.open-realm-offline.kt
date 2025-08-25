// You can only open a synced realm offline if there is a cached user credential. If
// there is no app.currentUser, you must log them in, which requires a network connection.
if (app.currentUser == null) {
    app.login(Credentials.emailPassword(email, password))
}
// If the app.currentUser isn't null, you can use the cached credential to open the synced
// realm even if the user is offline.
val user = app.currentUser!!
val realm = Realm.open(config)

// Query the realm we opened, and see that it contains data
val offlineToads: RealmResults<Toad> = realm.query<Toad>().find()
Log.v("After opening a realm offline, offlineToads.size is ${offlineToads.size}")
realm.close()
