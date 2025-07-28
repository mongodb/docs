@Serializable
data class Appointment(
    val name: String,
    @Contextual val date: LocalDate,
    val time: LocalTime,
)
