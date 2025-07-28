import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.client.model.Filters.eq
import com.mongodb.client.model.Updates.inc
import config.getConfig
import kotlinx.coroutines.runBlocking
import org.junit.jupiter.api.AfterAll
import org.junit.jupiter.api.Assertions.assertNotNull
import org.junit.jupiter.api.BeforeAll
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class TransactionsTest {

    // :snippet-start: data-class
    data class Account(
        val accountId: String,
        val amount: Int
    )
    // :snippet-end:

    companion object {
        val config = getConfig()
        val client = MongoClient.create(config.connectionUri)
        val database = client.getDatabase("bank")

        @BeforeAll
        @JvmStatic
        fun beforeAll() {
            runBlocking {
                val savAcct = Account("9876", 900)
                database.getCollection<Account>("savings_accounts").insertOne(savAcct)

                val chkAcct = Account("9876", 50)
                database.getCollection<Account>("checking_accounts").insertOne(chkAcct)
            }
        }

        @AfterAll
        @JvmStatic
        fun afterAll() {
            runBlocking {
                database.drop()
                client.close()
            }
        }
    }

    @Test
    fun transactionTest() = runBlocking {
        // :snippet-start: transaction-function
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
            assertNotNull(result) // :remove:
        } catch (error: Exception) {
            println("An error occurred during the transaction: ${error.message}")
            // Abort the transaction
            session.abortTransaction()
        }
        // :snippet-end:
    }
}
