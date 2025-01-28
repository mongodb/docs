# start-simple-val
class Person
  include Mongoid::Document
  
  field :name, type: String
  validates :name, presence: true
end
# end-simple-val

# start-comparison
class Order
  include Mongoid::Document
  
  field :order_date, type: DateTime
  field :delivery_date, type: DateTime
  field :quantity, type: Integer

  validates :delivery_date, comparison: { greater_than: :order_date }
  validates :quantity, comparison: { less_than: 5 }
end
# end-comparison

# start-fmt
class User
  include Mongoid::Document
  
  field :username, type: String

  validates :username, format: { with: /\A[a-zA-Z]+\z/ }
end
# end-fmt

# start-inclusion
class Order
  include Mongoid::Document
  
  field :shipping, type: String

  validates :shipping, inclusion: { in: %w(standard priority overnight) }
end
# end-inclusion

# start-absence
class Order
  include Mongoid::Document
  
  field :delivery_date, type: String

  validates :delivery_date, absence: true
end
# end-absence

# start-unique
class Person
  include Mongoid::Document
  
  field :first_name, type: String
  field :last_name, type: String

  validates :first_name, uniqueness: { scope: :last_name }
end
# end-unique

# start-assoc
class Author
  include Mongoid::Document
  
  embeds_many :books

  validates_associated :books
end
# end-assoc

# start-valid
class Person
  include Mongoid::Document
  
  field :name, type: String
  field :age, type: Integer

  validates :age, comparison: { greater_than_or_equal_to: 0 }
end

# Returns true
Person.new(name: "Berta Odom", age: 4).valid?

# Returns false
Person.new(name: "Cody Peng", age: -5).valid?
# end-valid