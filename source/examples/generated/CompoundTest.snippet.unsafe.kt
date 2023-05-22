suspend fun bookARoomUnsafe(guestName: String) {
    val filter = Filters.eq("reserved", false)
    val myRoom = hotelCollection.find(filter).firstOrNull()
    if (myRoom == null) {
        println("Sorry, we are booked, $guestName")
        return
    }

    val myRoomName = myRoom.room
    println("You got the $myRoomName, $guestName")

    val update = Updates.combine(Updates.set("reserved", true), Updates.set("guest", guestName))
    val roomFilter = Filters.eq("_id", myRoom.id)
    hotelCollection.updateOne(roomFilter, update)
}
