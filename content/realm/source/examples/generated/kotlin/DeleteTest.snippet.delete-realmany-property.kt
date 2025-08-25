realm.write {
    val frog = query<Frog>().find().first()
    frog.favoriteThings[0] = null
}
