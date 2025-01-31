# start-available-subscriber
subscriber = Mongo::Monitoring::ServerOpeningLogSubscriber.new

# Globally subscribes to ServerOpening events by using the SERVER_OPENING monitoring topic
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::SERVER_OPENING, subscriber)
client = Mongo::Client.new(['127.0.0.1:27017'])

# Subscribes to ServerOpening events at the client level by using the SERVER_OPENING monitoring topic
client.subscribe( Mongo::Monitoring::SERVER_OPENING, subscriber )
# end-available-subscriber

# start-sdam
class SDAMLogSubscriber
  include Mongo::Loggable

  def succeeded(event)
    log_debug(format_event(event))
  end

  private

  def logger
    Mongo::Logger.logger
  end

  def format_message(message)
    format("SDAM | %s", message)
  end
end
  
class TopologyOpeningLogSubscriber < SDAMLogSubscriber
  private

  def format_event(event)
    "Topology type '#{event.topology.display_name}' initializing."
  end
end

class ServerOpeningLogSubscriber < SDAMLogSubscriber
  private

  def format_event(event)
    "Server #{event.address} initializing."
  end
end

class ServerDescriptionChangedLogSubscriber < SDAMLogSubscriber
  private

  def format_event(event)
    "Server description for #{event.address} changed from " +
    "'#{event.previous_description.server_type}' to '#{event.new_description.server_type}'."
  end
end

class TopologyChangedLogSubscriber < SDAMLogSubscriber
  private

  def format_event(event)
    if event.previous_topology != event.new_topology
      "Topology type '#{event.previous_topology.display_name}' changed to " +
      "type '#{event.new_topology.display_name}'."
    else
      "There was a change in the members of the '#{event.new_topology.display_name}' " +
      "topology."
    end
  end
end

class ServerClosedLogSubscriber < SDAMLogSubscriber
  private

  def format_event(event)
    "Server #{event.address} connection closed."
  end
end

class TopologyClosedLogSubscriber < SDAMLogSubscriber
  private

  def format_event(event)
    "Topology type '#{event.topology.display_name}' closed."
  end
end
#end-sdam

# start-sdam-subscriber-global
topology_opening_subscriber = TopologyOpeningLogSubscriber.new
server_opening_subscriber = ServerOpeningLogSubscriber.new
server_description_changed_subscriber = ServerDescriptionChangedLogSubscriber.new
topology_changed_subscriber = TopologyChangedLogSubscriber.new
server_closed_subscriber = ServerClosedLogSubscriber.new
topology_closed_subscriber = TopologyClosedLogSubscriber.new

Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::TOPOLOGY_OPENING,
  topology_opening_subscriber)
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::SERVER_OPENING,
  server_opening_subscriber)
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::SERVER_DESCRIPTION_CHANGED,
  server_description_changed_subscriber)
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::TOPOLOGY_CHANGED,
  topology_changed_subscriber)
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::SERVER_CLOSED,
  server_closed_subscriber)
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::TOPOLOGY_CLOSED,
  topology_closed_subscriber)
# end-sdam-subscriber-global

# start-sdam-subscriber-client
topology_opening_subscriber = TopologyOpeningLogSubscriber.new
server_opening_subscriber = ServerOpeningLogSubscriber.new
server_description_changed_subscriber = ServerDescriptionChangedLogSubscriber.new
topology_changed_subscriber = TopologyChangedLogSubscriber.new
server_closed_subscriber = ServerClosedLogSubscriber.new
topology_closed_subscriber = TopologyClosedLogSubscriber.new

sdam_proc = Proc.new do |client|
  client.subscribe(Mongo::Monitoring::TOPOLOGY_OPENING,
    topology_opening_subscriber)
  client.subscribe(Mongo::Monitoring::SERVER_OPENING,
    server_opening_subscriber)
  client.subscribe(Mongo::Monitoring::SERVER_DESCRIPTION_CHANGED,
    server_description_changed_subscriber)
  client.subscribe(Mongo::Monitoring::TOPOLOGY_CHANGED,
    topology_changed_subscriber)
  client.subscribe(Mongo::Monitoring::SERVER_CLOSED,
    server_closed_subscriber)
  client.subscribe(Mongo::Monitoring::TOPOLOGY_CLOSED,
    topology_closed_subscriber)
end

client = Mongo::Client.new(['127.0.0.1:27017'], database: 'test',
  sdam_proc: sdam_proc)
# end-sdam-subscriber-client

# start-heartbeat
class HeartbeatLogSubscriber
  include Mongo::Loggable

  def started(event)
    log_debug("#{event.address} | STARTED")
  end

  def succeeded(event)
    log_debug("#{event.address} | SUCCEEDED | #{event.duration}s")
  end

  def failed(event)
    log_debug("#{event.address} | FAILED | #{event.error.class}: #{event.error.message} | #{event.duration}s")
  end

  private

  def logger
    Mongo::Logger.logger
  end

  def format_message(message)
    format("HEARTBEAT | %s", message)
  end
end
# end-heartbeat

# start-heartbeat-subscribe
subscriber = HeartbeatLogSubscriber.new

# Globally subscribes to Server Opening events
Mongo::Monitoring::Global.subscribe(Mongo::Monitoring::SERVER_HEARTBEAT, subscriber)

# Subscribes to Server Opening events at the client level
client = Mongo::Client.new([ '127.0.0.1:27017' ], database: 'test' )
client.subscribe( Mongo::Monitoring::SERVER_HEARTBEAT, subscriber )
# end-heartbeat-subscribe
