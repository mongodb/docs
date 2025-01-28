# start-simple-inheritance
class Person
  include Mongoid::Document

  field :name, type: String
end

class Employee < Person
  field :company, type: String
  field :tenure, type: Integer

  scope :new_hire, ->{ where(:tenure.lt => 1) }
end

class Manager < Employee
end
# end-simple-inheritance

# start-embedded-inheritance
class Person
  include Mongoid::Document

  field :name, type: String
  embeds_many :infos
end

...

class Info
  include Mongoid::Document

  field :active, type: Boolean
  embedded_in :person
end

class Phone < Info
  field :value, type: Float
  field :country, type: String
end

class Email < Info
  field :value, type: String
  field :category, type: String
end
# end-embedded-inheritance

# start-association-operations
# Creates a new Employee instance
e = Employee.create(
  name: "Lance Huang",
  company: "XYZ Communications",
  tenure: 2
)

# Builds an Info object
e.infos.build({ active: true })

# Builds a Phone object
e.infos.build(
  { active: true, value: 1239007777, country: "USA" }, 
  Phone
)

# Creates an Email object
e.infos.create(
  { active: true, value: "l.huang@company.com", category: "work" }, 
  Email
)

# Creates and assigns an Email object
p = Email.new(active: false, value: "lanceh11@mymail.com", category: "personal" )
e.infos << p

# Saves the Employee instance to database
e.save
# end-association-operations
