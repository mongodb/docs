val querySingleFrog = realm.query<Frog>().first()
val singleFrog = querySingleFrog.find()

if (singleFrog != null) {
    println("${singleFrog.name} is a frog.")
} else {
    println("No frogs found.")
}
