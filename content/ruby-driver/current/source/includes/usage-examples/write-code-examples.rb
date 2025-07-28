require 'bundler/inline'
gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

uri = "<connection string>"

Mongo::Client.new(uri) do |client|
  database = client.use('sample_restaurants')
  collection = database[:restaurants]

  # start-insert-one
  document = { field_name: '<field value>' }
  collection.insert_one(document)
  # end-insert-one

  # start-insert-many
  documents = [
    { field_name: '<field value 1>' },
    { field_name: '<field value 2>' }
  ]
  collection.insert_many(documents)
  # end-insert-many

  # start-update-one
  filter = { field_name: '<field value>' }
  update = { <update definition> }
  collection.update_one(filter, update)
  # end-update-one

  # start-update-many
  filter = { field_name: '<field value>' }
  update = { <update definition> }
  collection.update_many(filter, update)
  # end-update-many

  # start-replace-one
  filter = { field_name: '<field value>' }
  new_document = { field_name: '<field value>' }
  collection.replace_one(filter, new_document)
  # end-replace-one

  # start-delete-one
  filter = { field_name: '<field value>' }
  collection.delete_one(filter)
  # end-delete-one

  # start-delete-many
  filter = { field_name: '<field value>' }
  collection.delete_many(filter)
  # end-delete-many

  # start-bulk-write
  operations = [
    { <bulk operation 1> },
    { <bulk operation 2> },
    { <bulk operation 3> },
  ]
  collection.bulk_write(operations)
  # end-bulk-write
end