// Set up the session
val session = client.startSession()

try {
    session.startTransaction()

    val savingsColl = database
        .getCollection<Account>("savings_accounts")
    val checkingColl = database
        .getCollection<Account>("checking_accounts")

    savingsColl.findOneAndUpdate(
        session,
        eq(Account::accountId.name, "9876"),
        inc(Account::amount.name, -100),
    )

    checkingColl.findOneAndUpdate(
        session,
        eq(Account::accountId.name, "9876"),
        inc(Account::amount.name, 100)
    )

    // Commit the transaction
    val result = session.commitTransaction()
    println("Transaction committed.")
} catch (error: Exception) {
    println("An error occurred during the transaction: ${error.message}")
    // Abort the transaction
    session.abortTransaction()
}
