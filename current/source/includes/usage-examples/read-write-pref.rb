require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = '<connection string>'

Mongo::Client.new(uri) do |client|
  # Access the database and collection

  # start-write-concern
  client = Mongo::Client.new(['IP_ADDRESS_001:27017'], database: 'myDB')
  myDB = client.database
  myCollection = myDB[:myCollection]

  myCollection.insert_one(
    { name: 'anotherDocumentName' },
    write: {
      w: 2,
      wtimeout: 5000
    }
  )
  # end-write-concern

   # start-write-concern-2
  myDoc = { name: 'New Document' }
  new_write_concern = Mongo::WriteConcern.get(myDB.write_concern)
  myDB[:myCollection].with(write: new_write_concern).insert_one(myDoc)
  # end-write-concern-2

  # start-read-concern
  pipeline = [
    { "$match" => { category: 'KITCHENWARE' } },
    { "$unset" => ['_id', 'category'] }
  ]
  result = myCollection.aggregate(pipeline,
  read: { read_concern: { level: :available } })
  # end-read-concern

  # start-change-read-concern
  client = Mongo::Client.new(['IP_ADDRESS_001:27017'], 
    database: 'mydb', 
    read_concern: { level: :local })
  myDB = client.database
  # end-change-read-concern

  # start-read-preference
  transaction_options = {
    read: { mode: :primary },
    read_concern: { level: :local },
    write_concern: { w: :majority }
  }
  session = client.start_session
  session.start_transaction(transaction_options)
  session.commit_transaction
  # ...
  rescue => e
      session.abort_transaction
      puts "Transaction aborted due to an error: #{e.message}"
  ensure
      session.end_session
  end
  # end-read-preference

  # start-read-preference-cluster
  uri = 'mongodb+srv://<user>:<password>@<cluster-url>'
  options = {
    read: {
      mode: :secondary,
      max_staleness: 120
    }
  }
  client = Mongo::Client.new(uri, options)
  myDB = client.database
  # end-read-preference-cluster
end



