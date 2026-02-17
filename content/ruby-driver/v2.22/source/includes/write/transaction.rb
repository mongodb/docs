require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string URI>"

Mongo::Client.new(uri) do |client|
  #start-txn
  database = client.use('sample_mflix')
  movies_collection = database[:movies]
  users_collection = database[:users]
  
  def run_transaction(session, movies_collection, users_collection)
    transaction_options = {
      read_concern: { level: "snapshot" },
      write_concern: { w: "majority" }
    }
  
  session.with_transaction(transaction_options) do
    # Inserts document into the "movies" collection
    insert_result = movies_collection.insert_one({ name: 'The Menu', runtime: 107 }, session: session)
    puts "Insert completed: #{insert_result.inspect}"
  
    # Updates document in the "users" collection
    update_result = users_collection.update_one({ name: 'Amy Phillips'}, { "$set" => { name: 'Amy Ryan' }}, session: session)
    puts "Update completed: #{update_result.inspect}"
    end
  end
  
  # Starts a session
  session = client.start_session
  
  begin
    # Runs the transaction
    run_transaction(session, movies_collection, users_collection)
    puts "Transaction committed successfully."
  rescue Mongo::Error::OperationFailure => e
    puts "Transaction failed and was aborted. Error: #{e.message}"
  ensure
    session.end_session
  end
  #end-txn
end