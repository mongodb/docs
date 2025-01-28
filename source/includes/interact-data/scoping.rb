# start-named-scope-1
class Band
  include Mongoid::Document

  field :country, type: String
  field :genres, type: Array

  scope :japanese, ->{ where(country: "Japan") }
  scope :rock, ->{ where(:genres.in => [ "rock" ]) }
end
# end-named-scope-1

# start-query-named-scope
Band.japanese.rock
# end-query-named-scope

# start-named-scope-2
class Band
  include Mongoid::Document

  field :name, type: String
  field :country, type: String

  scope :based_in, ->(country){ where(country: country) }
end
# end-named-scope-2

# start-query-named-scope-2
Band.based_in("Spain")
# end-query-named-scope-2

# start-named-scope-3
class Band
  include Mongoid::Document

  def self.on_tour
    true
  end

  scope :on_tour, ->{ where(on_tour: true) }
end
# end-named-scope-3

# start-default-scope-1
class Band
  include Mongoid::Document

  field :name, type: String
  field :active, type: Boolean

  default_scope -> { where(active: true) }
end
# end-default-scope-1

# start-default-scope-2
class Band
  include Mongoid::Document

  field :name, type: String
  field :on_tour, type: Boolean, default: true

  default_scope ->{ where(on_tour: false) }
end

# Creates a new Band instance in which "on_tour" is "false"
Band.new
# end-default-scope-2

# start-unscoped
# Inline example
Band.unscoped.where(name: "Depeche Mode")

# Block example
Band.unscoped do
  Band.where(name: "Depeche Mode")
end
# end-unscoped

# start-scope-association
class Label
  include Mongoid::Document

  field :name, type: String

  embeds_many :bands
end
  
class Band
  include Mongoid::Document

  field :name, type: String
  field :active, default: true

  embedded_in :label
  default_scope ->{ where(active: true) }
end
# end-scope-association

# start-scope-association-steps
label = Label.new(name: "Hello World Records")
band = Band.new(name: "Ghost Mountain")
label.bands.push(band)
label.bands # Displays the Band because "active" is "true"
band.update_attribute(:active, false) # Updates "active" to "false"

# Displays the "Ghost Mountain" band
label.bands # => {"_id":"...","name":"Ghost Mountain",...}

# Won't display "Ghost Mountain" band after reloading
label.reload.bands # => nil
# end-scope-association-steps

# start-scope-query-behavior
class Band
  include Mongoid::Document
  
  field :name
  field :touring
  field :member_count
  
  default_scope ->{ where(touring: true) }
end

# Combines the condition to the default scope with "and"
Band.where(name: 'Infected Mushroom')
# Interpreted query:
# {"touring"=>true, "name"=>"Infected Mushroom"}

# Combines the first condition to the default scope with "and"
Band.where(name: 'Infected Mushroom').or(member_count: 3)
# Interpreted query:
# {"$or"=>[{"touring"=>true, "name"=>"Infected Mushroom"}, {"member_count"=>3}]}

# Combines the condition to the default scope with "or"
Band.or(member_count: 3)
# Interpreted query:
# {"$or"=>[{"touring"=>true}, {"member_count"=>3}]}
# end-scope-query-behavior

# start-override-scope
class Band
  include Mongoid::Document

  field :country, type: String
  field :genres, type: Array

  scope :mexican, ->{ where(country: "Mexico") }
end
# end-override-scope

# start-override-scope-block
Band.with_scope(Band.mexican) do
  Band.all
end
# end-override-scope-block

# start-class-methods
class Band
  include Mongoid::Document
  
  field :name, type: String
  field :touring, type: Boolean, default: true
  
  def self.touring
    where(touring: true)
  end
end

Band.touring
# end-class-methods
