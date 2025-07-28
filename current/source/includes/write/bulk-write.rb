require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  # start-db-coll
  database = client.use('sample_restaurants')
  collection = database[:restaurants]
  # end-db-coll

  # start-bulk-insert-one
  insert_one = { insert_one: { name: 'Steve Rogers Cafe', borough: 'Brooklyn' } }
  # end-bulk-insert-one

  # start-bulk-update-one
  update_one = { update_one: 
    { 
      filter: { name: 'Mountain View' },
      update: { '$set': { borough: 'Queens' } }
    }
  }
  # end-bulk-update-one

  # start-bulk-update-many
  update_many = { update_many: 
    { 
      filter: { name: 'Starbucks' },
      update: { '$set': { cuisine: 'Cafe' } }
    }
  }
  # end-bulk-update-many

  # start-bulk-replace-one
  replace_one = { replace_one:
    { 
      filter: { name: 'Old World Diner' },
      replacement: { '$set': { name: 'New Age Luncheonette' } }
    }
  }
  # end-bulk-replace-one

  # start-bulk-delete-one
  delete_one = { delete_one: { name: 'Old World Diner' } }
  # end-bulk-delete-one

  # start-bulk-delete-many
  delete_many = { delete_many: { name: 'Starbucks' } }
  # end-bulk-delete-many

  # start-bulk-write-mixed
  insert_one = { insert_one: { name: 'Nuovo Ristorante', borough: 'Brooklyn', cuisine: 'Italian' } }
  update_one = { update_one: 
    { 
      filter: { name: 'Moonlit Tavern' },
      update: { '$set': { borough: 'Queens' } }
    }
  }
  delete_many = { delete_many: { name: 'Crepe' } }
  writes = [insert_one, update_one, delete_many]
  collection.bulk_write(writes)
  # end-bulk-write-mixed

  # start-bulk-write-unordered
  options = { ordered: false }
  collection.bulk_write(writes, options)
  # end-bulk-write-unordered
end