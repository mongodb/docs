
import com.mongodb.ConnectionString
import com.mongodb.MongoClientSettings
import com.mongodb.event.*
import com.mongodb.kotlin.client.coroutine.MongoClient
import com.mongodb.management.JMXConnectionPoolListener
import io.github.cdimascio.dotenv.dotenv
import kotlinx.coroutines.flow.firstOrNull
import kotlinx.coroutines.runBlocking
import org.bson.Document
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import kotlin.test.assertEquals

@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class MonitoringTest {
    companion object {
        private val dotenv = dotenv()
        private const val COLLECTION = "compound-ops"
        private const val DATABASE = "test"
        private val URI = ConnectionString(dotenv["MONGODB_CONNECTION_URI"])
    }

    @Test
    fun monitorCommandEventTest() = runBlocking {
        // :snippet-start: command-listener-impl
        class CommandCounter : CommandListener {
            private val commands = mutableMapOf<String, Int>()

            // :remove-start:
            val commandCount: Map<String, Int>
                get() = commands
            // :remove-end:

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
        // :snippet-end:

        // :snippet-start: monitor-command
        val commandCounter = CommandCounter()

        val settings = MongoClientSettings.builder()
            .applyConnectionString(URI)
            .addCommandListener(commandCounter)
            .build()
        val mongoClient = MongoClient.create(settings)
        val database = mongoClient.getDatabase(DATABASE)
        val collection = database.getCollection<Document>(COLLECTION)

        // Run some commands to test the counter
        collection.find().firstOrNull()
        collection.find().firstOrNull()
        // :snippet-end: monitor-command-example
        assertEquals(2, commandCounter.commandCount["find"])
        mongoClient.close()
    }

    @Test
    fun monitorClusterEventTest() = runBlocking {
        // :snippet-start: cluster-listener-impl
        class IsWriteable : ClusterListener {
            private var isWritable = false

            // :remove-start:
            val isWritableCluster: Boolean
                get() = isWritable
            // :remove-end:

            @Synchronized
            override fun clusterDescriptionChanged(event: ClusterDescriptionChangedEvent) {
                if (!isWritable) {
                    if (event.newDescription.hasWritableServer()) {
                        isWritable = true
                        println("Able to write to cluster")
                    }
                } else {
                    if (!event.newDescription.hasWritableServer()) {
                        isWritable = false
                        println("Unable to write to cluster")
                    }
                }
            }
        }
        // :snippet-end:

        // :snippet-start: monitor-cluster
        val clusterListener = IsWriteable()
        val settings = MongoClientSettings.builder()
            .applyConnectionString(URI)
            .applyToClusterSettings { builder ->
                builder.addClusterListener(clusterListener)
            }
            .build()
        val mongoClient = MongoClient.create(settings)
        val database = mongoClient.getDatabase(DATABASE)
        val collection = database.getCollection<Document>(COLLECTION)
        // Run a command to trigger a ClusterDescriptionChangedEvent event
        collection.find().firstOrNull()
        // :snippet-end: monitor-cluster-example
        assertEquals(true, clusterListener.isWritableCluster)
        mongoClient.close()
    }

    @Test
    fun monitorConnectionPoolEventTest() = runBlocking {
        // :snippet-start: cp-listener-impl
        class ConnectionPoolLibrarian : ConnectionPoolListener {
            // :remove-start:
            var success = false
            // :remove-end:

            override fun connectionCheckedOut(event: ConnectionCheckedOutEvent) {
                success = true // :remove:
                println("Let me get you the connection with id ${event.connectionId.localValue}...")
            }

            override fun connectionCheckOutFailed(event: ConnectionCheckOutFailedEvent) {
                println("Something went wrong! Failed to checkout connection.")
            }
        }
        // :snippet-end:
        // :snippet-start: monitor-cp
        val cpListener = ConnectionPoolLibrarian()
        val settings = MongoClientSettings.builder()
            .applyConnectionString(URI)
            .applyToConnectionPoolSettings { builder ->
                builder.addConnectionPoolListener(cpListener)
            }
            .build()
        val mongoClient = MongoClient.create(settings)
        val database = mongoClient.getDatabase(DATABASE)
        val collection = database.getCollection<Document>(COLLECTION)
        // Run a command to trigger connection pool events
        collection.find().firstOrNull()
        // :snippet-end:
        assert(cpListener.success)
        mongoClient.close()
    }
    @Test
    fun testJMXMonitoringConfiguration() = runBlocking {
        val uri = URI
        // :snippet-start: jmx
        val connectionPoolListener = JMXConnectionPoolListener()
        val settings = MongoClientSettings.builder()
            .applyConnectionString(uri)
            .applyToConnectionPoolSettings {
                it.addConnectionPoolListener(connectionPoolListener)
            }
            .build()
        val mongoClient: MongoClient = MongoClient.create(settings)

        try {
            println("Navigate to JConsole to see your connection pools...")
            // :uncomment-start:
            // Thread.sleep(Long.MAX_VALUE)
            // :uncomment-end:
        } catch (e: Exception) {
            e.printStackTrace()
        }
        // :snippet-end:

        // Verify that the JMXConnectionPoolListener is present in the MongoClientSettings
        val connectionPoolListeners = settings.connectionPoolSettings.connectionPoolListeners
        assert(connectionPoolListeners.contains(connectionPoolListener))

        // Close the MongoClient to release resources
        mongoClient.close()
    }
}
