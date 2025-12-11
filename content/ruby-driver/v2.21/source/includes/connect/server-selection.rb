# start-server-selection
# Defines the custom server selection algorithm 
def prefer_local(server_descriptions)
  servers = server_descriptions.select do |server|
    server.address.host == "localhost"
  end

  if servers.empty?
    return server_descriptions
  end
  servers
end

# Calls the client constructor and passes the custom function to the server_selector argument
client = Mongo::Client.new("mongodb://<db_username>:<db_password>@<hostname>:<port>",
                                server_selector=prefer_local)
# end-server-selection