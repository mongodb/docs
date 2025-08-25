@Serializable
class Frogger(
    val name: String,
    @Contextual
    val date: LocalDateTime
)

AppConfiguration.Builder(FLEXIBLE_APP_ID)
    .ejson(
        EJson(
            serializersModule = SerializersModule {
                contextual(DateAsIntsSerializer)
            }
        )
    )
    .build()
