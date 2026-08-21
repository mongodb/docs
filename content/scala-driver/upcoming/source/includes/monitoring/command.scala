import org.mongodb.scala._
import com.mongodb.event._

object CommandMonitoring {
  // start-command-listener-impl
  case class CommandCounter() extends CommandListener {
    private val commands =
      scala.collection.mutable.Map[String, Int]()

    override def commandStarted(event: CommandStartedEvent): Unit = {}

    override def commandSucceeded(
        event: CommandSucceededEvent
    ): Unit = {
      val commandName = event.getCommandName
      commands(commandName) =
        commands.getOrElse(commandName, 0) + 1
      println(commands.toMap)
    }

    override def commandFailed(event: CommandFailedEvent): Unit = {}
  }
  // end-command-listener-impl

  def main(args: Array[String]): Unit = {
    // start-monitor-command
    val settings: MongoClientSettings = MongoClientSettings
      .builder()
      .addCommandListener(CommandCounter())
      .applyConnectionString(ConnectionString("<connection string>"))
      .build()
    val mongoClient: MongoClient = MongoClient(settings)
    // end-monitor-command
  }
}
