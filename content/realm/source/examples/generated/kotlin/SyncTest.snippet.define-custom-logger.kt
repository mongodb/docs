class MyLogger() : RealmLogger {
    override val tag: String = "CUSTOM_LOG_ENTRY"
    override val level: LogLevel = LogLevel.DEBUG
    override fun log(
        level: LogLevel,
        throwable: Throwable?,
        message: String?,
        vararg args: Any?
    ) {
        println(message) // Custom handling
    }
}
