val house = realm.where(HauntedHouse::class.java)
    .findFirst()!!
realm.executeTransaction {
    Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 0
    house.ghosts.increment(1)
    Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 1
    house.ghosts.increment(5)
    Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 6
    house.ghosts.decrement(2)
    Log.v("EXAMPLE", "Number of ghosts: ${house.ghosts.get()}") // 4
}
