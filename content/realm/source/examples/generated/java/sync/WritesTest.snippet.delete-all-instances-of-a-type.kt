realm.executeTransaction { r: Realm ->
    r.delete(Turtle::class.java)
}
