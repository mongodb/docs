from pymongo import MongoClient
from pymongo.monitoring import CommandListener, CommandSucceededEvent, ServerListener, \
    ConnectionPoolListener, ServerHeartbeatStartedEvent, \
    ConnectionCreatedEvent

# start-monitoring
class MyCommandListener(CommandListener):
    def succeeded(self, event: CommandSucceededEvent):
        print(f"Command {event.command_name} succeeded")

    # Include other event method implementations here

class MyServerListener(ServerListener):
    def heartbeat_started(self, event: ServerHeartbeatStartedEvent):
        print(f"Heartbeat started on server with id: {event.connection_id}")

    # Include other event method implementations here

class MyPoolListener(ConnectionPoolListener):
    def connection_created(self, event: ConnectionCreatedEvent):
        print(f"Connection {event.connection_id} created")

    # Include other event method implementations here

listeners = [MyCommandListener(), MyServerListener(), MyPoolListener()]
client = MongoClient("<connection URI>", event_listeners=listeners)
# end-monitoring