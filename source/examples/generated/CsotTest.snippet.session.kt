val opts = ClientSessionOptions.builder()
    .defaultTimeout(200L, TimeUnit.MILLISECONDS)
    .build()

val session = client.startSession(opts)
// ... perform operations on ClientSession
