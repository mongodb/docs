# start-shard-key
class Person
  include Mongoid::Document

  field :ssn

  shard_key ssn: 1

  # The collection must also have an index that starts with the shard key.
  index ssn: 1
end
# end-shard-key

# start-shard-key-formats
# Create a ranged shard key
shard_key ssn: 1

# Create a compound shard key
shard_key ssn: 1, country: 1

# Create a hashed shard key
shard_key ssn: :hashed

# Specify a shard key option
shard_key {ssn: :hashed}, unique: true
# end-shard-key-formats

# start-shard-key-shorthand
# Create a ranged shard key
shard_key :ssn

# Create a compound shard key
shard_key :ssn, :country
# end-shard-key-shorthand

# start-shard-key-association
class Person
  include Mongoid::Document

  belongs_to :country

  # Shards by country_id
  shard_key country: 1

  # The collection must have an index that starts with the shard key
  index country: 1
end
# end-shard-key-association

# start-shard-key-embedded
class Person
  include Mongoid::Document

  field :address

  shard_key "address.city"
end
# end-shard-key-embedded