suspend fun bookARoomSafe(guestName: String) {
    val update = Updates.combine(
        Updates.set(HotelRoom::reserved.name, true),
        Updates.set(HotelRoom::guest.name, guestName)
    )
    val filter = Filters.eq("reserved", false)
    val myRoom = hotelCollection.findOneAndUpdate(filter, update)
    if (myRoom == null) {
        println("Sorry, we are booked, $guestName")
        return
    }
    val myRoomName = myRoom.room
    println("You got the $myRoomName, $guestName")
}
