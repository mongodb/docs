class CommandCounter : CommandListener {
    private val commands = mutableMapOf<String, Int>()


    @Synchronized
    override fun commandSucceeded(event: CommandSucceededEvent) {
        val commandName = event.commandName
        val count = commands[commandName] ?: 0
        commands[commandName] = count + 1
        println(commands.toString())
    }

    override fun commandFailed(event: CommandFailedEvent) {
        println("Failed execution of command '${event.commandName}' with id ${event.requestId}")
    }
}
