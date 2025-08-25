// Open a write transaction
realm.write {
    // Get the live object
    val frog = query<Frog>("_id == $0", PRIMARY_KEY_VALUE).find().first()
    val counter: MutableRealmInt? = frog.fliesEaten
    counter?.get() // 1

    // Increment the value of the MutableRealmInt property
    // ** Note use of decrement() with negative value **
    counter?.increment(0) // 1
    counter?.increment(5) // 6
    counter?.decrement(-2) // 8

    // Decrement the value of the MutableRealmInt property
    // ** Note use of increment() with negative value **
    counter?.decrement(0) // 8
    counter?.decrement(2) // 6
    counter?.increment(-1) // 5

    // Set the value of the MutableRealmInt property
    // ** Use set() with caution **
    counter?.set(0)// 0
}
