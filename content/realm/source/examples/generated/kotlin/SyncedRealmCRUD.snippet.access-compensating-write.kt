val syncErrorHandler = SyncSession.ErrorHandler { session, error ->
    runBlocking {
        if (error is CompensatingWriteException) {
            error.writes.forEach { writeInfo ->
                val errorMessage = """
                    A write was rejected with a compensating write error
                    The write to object type: ${writeInfo.objectType}
                    With primary key of: ${writeInfo.primaryKey}
                    Was rejected because: ${writeInfo.reason}
                    """.trimIndent()
                Log.e(errorMessage)
            }
        }
    }
}
