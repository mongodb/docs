val collection = database.getCollection<Appointment>("appointments")

val apptDoc = Appointment(
    "Daria Smith",
    LocalDate(2024, 10, 15),
    LocalTime(hour = 11, minute = 30)
)

collection.insertOne(apptDoc)
