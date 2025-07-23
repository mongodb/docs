# start-define-fields
class Person
  include Mongoid::Document
  field :name, type: String
  field :date_of_birth, type: Date
  field :weight, type: Float
end
# end-define-fields

# start-define-untyped
class Product
  include Mongoid::Document

  field :name, type: String
  field :properties
end
# end-define-untyped

# start-untyped
product = Product.new(properties: "color=white,size=large")
# properties field saved as String: "color=white,size=large"

product = Product.new(properties: {color: "white", size: "large"})
# properties field saved as Object: {:color=>"white", :size=>"large"}
# end-untyped

# start-stringified-symbol
class Post
  include Mongoid::Document
  
  field :status, type: StringifiedSymbol
end
  
# Save status as a symbol
post = Post.new(status: :hello)
# status is stored as "hello" on the database, but returned as a Symbol
post.status
# Outputs: :hello

# Save status as a string
post = Post.new(status: "hello")
# status is stored as "hello" in the database, but returned as a Symbol
post.status
# Outputs: :hello
# end-stringified-symbol

# start-hash
class Person
  include Mongoid::Document
  field :first_name
  field :url, type: Hash
end

person = Person.new(url: {'home_page' => 'http://www.homepage.com'})
# end-hash

# start-time
class Voter
  include Mongoid::Document
  
  field :registered_at, type: Time
end
  
Voter.new(registered_at: Date.today)
# end-time

# start-datetime
class Ticket
  include Mongoid::Document
  field :purchased_at, type: DateTime
end
# end-datetime

# start-datetime-int
ticket.purchased_at = 1544803974
ticket.purchased_at
# Outputs: Fri, 14 Dec 2018 16:12:54 +0000
# end-datetime-int

# start-datetime-string
ticket.purchased_at = 'Mar 4, 2018 10:00:00 +01:00'
ticket.purchased_at
# Outputs: Sun, 04 Mar 2018 09:00:00 +0000
# end-datetime-string

# start-timestamps
class Post
  include Mongoid::Document
  include Mongoid::Timestamps
end
# end-timestamps

# start-timestamps-specific
class Post
  include Mongoid::Document
  include Mongoid::Timestamps::Created
end

class Post
  include Mongoid::Document
  include Mongoid::Timestamps::Updated
end
# end-timestamps-specific

# start-timestamps-disable
post.timeless.save
# end-timestamps-disable

# start-timestamps-short
class Post
  include Mongoid::Document
  include Mongoid::Timestamps::Short # For c_at and u_at.
end

class Post
  include Mongoid::Document
  include Mongoid::Timestamps::Created::Short # For c_at only.
end

class Post
  include Mongoid::Document
  include Mongoid::Timestamps::Updated::Short # For u_at only.
end
# end-timestamps-short

# start-regexp
class Token
  include Mongoid::Document
  
  field :pattern, type: Regexp
end
  
token = Token.create!(pattern: /hello.world/m)
token.pattern
# Outputs: /hello.world/m

# Reload the token from the database
token.reload
token.pattern
# Outputs: #<BSON::Regexp::Raw:0x0000555f505e4a20 @pattern="hello.world", @options="ms">
# end-regexp

# start-custom-field-type
class Point

  attr_reader :x, :y
  
  def initialize(x, y)
    @x, @y = x, y
  end
  
  # Converts an object of this instance into an array
  def mongoize
    [ x, y ]
  end
  
  class << self
  
    # Takes any possible object and converts it to how it is
    # stored in the database.
    def mongoize(object)
      case object
      when Point then object.mongoize
      when Hash then Point.new(object[:x], object[:y]).mongoize
      else object
      end
    end
  
    # Gets the object as it's stored in the database and instantiates
    # this custom class from it.
    def demongoize(object)
      if object.is_a?(Array) && object.length == 2
          Point.new(object[0], object[1])
      end
    end
  
    # Converts the object supplied to a criteria and converts it
    # into a queryable form.
    def evolve(object)
      case object
      when Point then object.mongoize
      else object
      end
    end
  end
end
# end-custom-field-type

# start-phantom-field-type
class ColorMapping

  MAPPING = {
    'black' => 0,
    'white' => 1,
  }.freeze

  INVERSE_MAPPING = MAPPING.invert.freeze

  class << self

    def mongoize(object)
      MAPPING[object]
    end

    def demongoize(object)
      INVERSE_MAPPING[object]
    end

    def evolve(object)
      MAPPING.fetch(object, object)
    end
  end
end

class Profile
  include Mongoid::Document
  field :color, type: ColorMapping
end

profile = Profile.new(color: 'white')
profile.color
# Outputs: "white"

# Sets "color" field to 0 in MongoDB
profile.save!
# end-phantom-field-type

# start-dynamic-field
class Person
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic
end
# end-dynamic-field

# start-reserved-characters
class User
  include Mongoid::Document
  field :"first.last", type: String
  field :"$_amount", type: Integer
end

user = User.first
user.send(:"first.last")
# Outputs: Mike.Trout
user.send(:"$_amount")
# Outputs: 42650000
# end-reserved-characters