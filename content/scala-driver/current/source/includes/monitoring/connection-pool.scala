import org.mongodb.scala._
import org.mongodb.scala.connection._
import com.mongodb.event._

object ConnectionPoolMonitoring {
  // start-cp-listener-impl
  case class ConnectionPoolLibrarian()
      extends ConnectionPoolListener {
    override def connectionCheckedOut(
        event: ConnectionCheckedOutEvent
    ): Unit =
      println(
        s"Let me get you the connection with id " +
          s"${event.getConnectionId.getLocalValue}..."
      )

    override def connectionCheckOutFailed(
        event: ConnectionCheckOutFailedEvent
    ): Unit = {}
  }
  // end-cp-listener-impl

  def main(args: Array[String]): Unit = {
    // start-monitor-cp
    val settings: MongoClientSettings = MongoClientSettings
      .builder()
      .applyToConnectionPoolSettings(
        (builder: ConnectionPoolSettings.Builder) =>
          builder.addConnectionPoolListener(
            ConnectionPoolLibrarian()
          )
      )
      .applyConnectionString(ConnectionString("<connection string>"))
      .build()
    val mongoClient: MongoClient = MongoClient(settings)
    // end-monitor-cp
  }
}
