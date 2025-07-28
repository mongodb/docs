class ConnectionPoolLibrarian : ConnectionPoolListener {

    override fun connectionCheckedOut(event: ConnectionCheckedOutEvent) {
        println("Let me get you the connection with id ${event.connectionId.localValue}...")
    }

    override fun connectionCheckOutFailed(event: ConnectionCheckOutFailedEvent) {
        println("Something went wrong! Failed to checkout connection.")
    }
}
