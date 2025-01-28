# start-example-models
class Book
  include Mongoid::Document

  field :title, type: String
  field :author, type: String
  field :length, type: Integer
end

class Film
  include Mongoid::Document

  field :title, type: String
  field :year, type: Integer
end
# end-example-models

# start-txn-operations
# Starts a transaction from the model class
Book.transaction do
  # Saves new Book and Film instances to MongoDB
  Book.create(title: 'Covert Joy', author: 'Clarice Lispector')
  Film.create(title: 'Nostalgia', year: 1983)
end

# Starts a transaction from an instance of Book
book = Book.create(title: 'Sula', author: 'Toni Morrison')
book.transaction do
  # Saves a new field value to the Book instance
  book.length = 192
  book.save!
end

# Starts a transaction from the Mongoid instance
Mongoid.transaction do
  # Deletes the Book instance in MongoDB
  book.destroy
end
# end-txn-operations

# start-different-clients
# Defines a class by using the :default client
class Post
  include Mongoid::Document
end
  
# Defines a class by using the :encrypted_client
class User
  include Mongoid::Document

  store_in client: :encrypted_client
end

# Starts a transaction on the :encrypted_client
User.transaction do
  # Uses the same client, so the operation is in the transaction
  User.create!
  # Uses a different client, so it is *not* in the transaction
  Post.create!
end
# end-different-clients

# start-lower-lvl-api
# Starts a session from the model class
Book.with_session do |session|
  session.start_transaction 
  # Creates a Book
  Book.create(title: 'Siddhartha', author: 'Hermann Hesse')

  # Commits the transaction
  session.commit_transaction
rescue StandardError
  # Ends the transaction if there is an error
  session.abort_transaction
end
# end-lower-lvl-api

# start-commit-retry
begin
  session.commit_transaction
rescue Mongo::Error => e
  if e.label?(Mongo::Error::UNKNOWN_TRANSACTION_COMMIT_RESULT_LABEL)
    retry
  else
    raise
  end
end
# end-commit-retry

# start-other-client
# Specifies that the operation should use the "other" client instead of
# the default client
User.with(client: :other) do
  Post.with(client: :other) do
    Post.with_session do |session|
      session.start_transaction
      Post.create!
      Post.create!
      User.create!
      session.commit_transaction
    end
  end
end
# end-other-client

# start-model-session
Book.with_session(causal_consistency: true) do
  Book.create!
  book = Person.first
  book.title = "Swann's Way"
  book.save
end
# end-model-session

# start-instance-session
book = Book.new
book.with_session(causal_consistency: true) do
  book.title = 'Catch-22'
  book.save
  book.sellers << Shop.create!
end
# end-instance-session