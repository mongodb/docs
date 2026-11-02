require 'bundler/inline'

gemfile do
  source 'https://rubygems.org'
  gem 'mongo'
end

# start-csfle-ruby-types
encrypted_client = Mongo::Client.new(
  '<connection string>',
  auto_encryption_options: {
    key_vault_namespace: '<key vault namespace>',
    kms_providers: { local: { key: '<local master key>' } }
  }
)

collection = encrypted_client[:users]
collection.insert_one({ _id: 1, large_number: 2**40 })

Mongo.csfle_convert_to_ruby_types = false
result = collection.find({ _id: 1 }).first
puts result['large_number'].class
puts result['large_number'].value

Mongo.csfle_convert_to_ruby_types = true
result = collection.find({ _id: 1 }).first
puts result['large_number'].class
puts result['large_number']
# end-csfle-ruby-types
