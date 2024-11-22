import org.mongodb.scala._
import org.mongodb.scala.connection._
import com.mongodb.event._

object Sdam {
  // start-listener-class
  case class TestClusterListener(readPreference: ReadPreference) extends ClusterListener {
    var isWritable: Boolean = false
    var isReadable: Boolean = false

    override def clusterOpening(event: ClusterOpeningEvent): Unit =
        println(s"Cluster with ID ${event.getClusterId} opening")

    override def clusterClosed(event: ClusterClosedEvent): Unit =
        println(s"Cluster with ID ${event.getClusterId} closed")

    override def clusterDescriptionChanged(event: ClusterDescriptionChangedEvent): Unit = {
        if (!isWritable) {
            if (event.getNewDescription.hasWritableServer) {
                isWritable = true
                println("Writable server available")
            }
        } else {
            if (!event.getNewDescription.hasWritableServer) {
                isWritable = false
                println("No writable server available")
            }
        }

        if (!isReadable) {
            if (event.getNewDescription.hasReadableServer(readPreference)) {
                isReadable = true
                println("Readable server available")
            }
        } else {
            if (!event.getNewDescription.hasReadableServer(readPreference)) {
                isReadable = false
                println("No readable server available")
            }
        }
    }
  }
  // end-listener-class

  def main(args: Array[String]): Unit = {
    // start-configure-client
    val uri: ConnectionString = ConnectionString("<connection string>")
    val settings: MongoClientSettings = MongoClientSettings
        .builder()
        .applyToClusterSettings((builder: ClusterSettings.Builder) =>
                builder.addClusterListener(TestClusterListener(ReadPreference.secondary())))
        .applyConnectionString(uri)
        .build()
    val client: MongoClient = MongoClient(settings)
    // end-configure-client
  }
}
