# start create! example
Person.create!(
  first_name: "Heinrich",
  last_name: "Heine"
)

Person.create!([
  { first_name: "Heinrich", last_name: "Heine" },
  { first_name: "Willy", last_name: "Brandt" }
])

Person.create!(first_name: "Heinrich") do |doc|
  doc.last_name = "Heine"
end
# end create! example

# start create example
Person.create(
  first_name: "Heinrich",
  last_name: "Heine"
)

class Post
  include Mongoid::Document
  validates_uniqueness_of :title
end

posts = Post.create([{title: "test"}, {title: "test"}])
posts.map { |post| post.persisted? } # => [true, false]
# end create example

# start save! example
person = Person.new(
  first_name: "Esmeralda",
  last_name: "Qemal"
)
person.save!

person.first_name = "Malik"
person.save!
# end save! example

# start save example
person = Person.new(
  first_name: "Tamara",
  last_name: "Graham"
)
person.save

person.first_name = "Aubrey"
person.save(validate: false)
# end save example

# start attributes example
person = Person.new(first_name: "James", last_name: "Nan")
person.save

puts person.attributes
# end attributes example

# start reload example
band = Band.create!(name: 'Sun 1')
# => #<Band _id: ..., name: "Sun 1">

band.name = 'Moon 2'
# => #<Band _id: ..., name: "Moon 2">

band.reload
# => #<Band _id: ..., name: "Sun 1">
# end reload example

# start reload unsaved example
existing = Band.create!(name: 'Photek')

band = Band.new(id: existing.id)
band.reload

puts band.name
# end reload unsaved example

# start update attributes! example
person.update_attributes!(
  first_name: "Maximilian",
  last_name: "Hjalmar"
)
# end update attributes! example

# start update attributes example
person.update_attributes(
  first_name: "Hasan",
  last_name: "Emine"
)
# end update attributes example

# start update attribute example
person.update_attribute(:first_name, "Jean")
# end update attribute example

# start upsert example
person = Person.new(
  first_name: "Balu",
  last_name: "Rama"
)
person.upsert

person.first_name = "Ananda"
person.upsert(replace: true)
# end upsert example

# start touch example
person.touch(:audited_at)
# end touch example

# start delete example
person = Person.create!(name: 'Edna Park')

unsaved_person = Person.new(id: person.id)
unsaved_person.delete
person.reload
# end delete example

# start destroy example
person.destroy
# end destroy example

# start delete all example
Person.delete_all
# end delete all example

# start destroy all example
Person.destroy_all
# end destroy all example

# start new record example
person = Person.new(
  first_name: "Tunde",
  last_name: "Adebayo"
)
puts person.new_record?

person.save!
puts person.new_record?
# end new record example

# start persisted example
person = Person.new(
  first_name: "Kiana",
  last_name: "Kahananui"
)
puts person.persisted?

person.save!
puts person.persisted?
# end persisted example

# start field values default
class Person
  include Mongoid::Document
  field :first_name
end
  
person = Person.new
  
person.first_name = "Artem"
person.first_name # => "Artem"
# end field values default

# start field values hash
class Person
  include Mongoid::Document
  
  field :first_name, as: :fn
end
  
person = Person.new(first_name: "Artem")
  
person["fn"]
# => "Artem"

person[:first_name] = "Vanya"
# => "Artem"

person
# => #<Person _id: ..., first_name(fn): "Vanya">
# end field values hash

# start read write attributes
class Person
  include Mongoid::Document

  def first_name
    read_attribute(:fn)
  end

  def first_name=(value)
    write_attribute(:fn, value)
  end
end
  
person = Person.new

person.first_name = "Artem"
person.first_name
# => "Artem"
# end read write attributes

# start read write instance
class Person
  include Mongoid::Document
  field :first_name, as: :fn
end
  
person = Person.new(first_name: "Artem")
# => #<Person _id: ..., first_name(fn): "Artem">

person.read_attribute(:first_name)
# => "Artem"

person.read_attribute(:fn)
# => "Artem"

person.write_attribute(:first_name, "Pushkin")

person
# => #<Person _id: ..., first_name(fn): "Pushkin">
# end read write instance

# start attributes= example
person.attributes = { first_name: "Jean-Baptiste", middle_name: "Emmanuel" }
# end attributes= example

# start write_attributes example
person.write_attributes(
  first_name: "Jean-Baptiste",
  middle_name: "Emmanuel",
)
# end write_attributes example

# start atomically example
person.atomically do
  person.inc(age: 1)
  person.set(name: 'Jake')
end
# end atomically example

# start default block atomic example
person.atomically do
  person.atomically do
      person.inc(age: 1)
      person.set(name: 'Jake')
  end
  raise 'An exception'
  # Name and age changes are persisted
end
# end default block atomic example

# start join_contexts atomic
person.atomically do
  person.atomically(join_context: true) do
      person.inc(age: 1)
      person.set(name: 'Jake')
  end
  raise 'An exception'
  # Name and age changes are not persisted
end
# end join_contexts atomic

# start-dirty-tracking-view
# Retrieves a person instance
person = Person.first
# Sets a new `name` value
person.name = "Sarah Frank"

# Checks to see if the document is changed
person.changed? # true
# Gets an array of changed fields.
person.changed # [ :name ]
# Gets a hash of the old and changed values for each field
person.changes # { "name" => [ "Sarah Frink", "Sarah Frank" ] }

# Checks if a specific field is changed
person.name_changed? # true
# Gets the changes for a specific field
person.name_change # [ "Sarah Frink", "Sarah Frank" ]

# Gets the previous value for a field
person.name_was # "Sarah Frink"
# end-dirty-tracking-view

# start-dirty-tracking-reset
person = Person.first
person.name = "Sarah Frank"

# Reset the changed `name` field
person.reset_name!
person.name # "Sarah Frink"
# end-dirty-tracking-reset

# start-dirty-tracking-prev
person = Person.first
person.name = "Sarah Frank"
person.save # Clears out current changes

# Lists the previous changes
person.previous_changes
# { "name" => [ "Sarah Frink", "Sarah Frank" ] }
# end-dirty-tracking-prev

# start-container-save
person = Person.new
interests = person.interests
# => #<Set: {}>
interests << 'Hiking'
# => #<Set: {"Hiking"}>

# Assigns the Set to the field
person.interests = interests
# => #<Set: {"Hiking"}>
person.interests
# => #<Set: {"Hiking"}>
# end-container-save

# start-override-readonly
class Person
  include Mongoid::Document
  field :name, type: String

  def readonly?
    true
  end
end

person = Person.first
person.readonly? # => true
person.destroy # => raises ReadonlyDocument error
# end-override-readonly
