# start-has-one
class Band
  include Mongoid::Document

  has_one :studio
end
# end-has-one

# start-has-one-child
class Studio
  include Mongoid::Document

  belongs_to :band
end
# end-has-one-child

# start-has-one-validation
class Band
  include Mongoid::Document

  has_one :studio

  validates_presence_of :studio
end
# end-has-one-validation

# start-has-many
class Band
  include Mongoid::Document

  has_many :members
end
# end-has-many

# start-has-many-child
class Member
  include Mongoid::Document

  belongs_to :band
end
# end-has-many-child

# start-has-many-validation
class Band
  include Mongoid::Document

  has_many :members

  validates_presence_of :members
end
# end-has-many-validation

# start-has-many-any
band = Band.first
band.members.any?
# end-has-many-any

# start-has-many-any-filter
band = Band.first
band.members.any? { |member| member.instrument == 'piano' }
# end-has-many-any-filter

# start-has-many-any-class
class Drummer < Member
end

band = Band.first
band.members.any?(Drummer)
# end-has-many-any-class

# start-has-many-exists
band = Band.create!
# Member is not persisted.
band.members.build

band.members.exists?
# Outputs: false

# Persist the member
band.members.map(&:save!)

band.members.exists?
# Outputs: true
# end-has-many-exists

# start-belongs-to
class Members
  include Mongoid::Document

  belongs_to :band
end
# end-belongs-to

# start-belongs-to-optional
class Members
  include Mongoid::Document

  belongs_to :band, optional: true
end
# end-belongs-to-optional

# start-belongs-to-one-way
class Band
  include Mongoid::Document
end

class Members
  include Mongoid::Document

  belongs_to :band
end
# end-belongs-to-one-way

# start-belongs-to-inverse
class Band
  include Mongoid::Document
end

class Members
  include Mongoid::Document

  belongs_to :band, inverse_of: nil
end
# end-belongs-to-inverse

# start-has-and-belongs-to-many
class Band
  include Mongoid::Document

  has_and_belongs_to_many :members
end

class Members
  include Mongoid::Document

  has_and_belongs_to_many :bands
end
# end-has-and-belongs-to-many

# start-has-and-belongs-to-many-inverse
class Band
  include Mongoid::Document

  has_and_belongs_to_many :tags, inverse_of: nil
end

class Tag
  include Mongoid::Document
end
# end-has-and-belongs-to-many-inverse

# start-query-models
class Band
  include Mongoid::Document
  has_many :tours

  field :name, type: String
end
class Tour
  include Mongoid::Document
  belongs_to :band

  field :year, type: Integer
end
# end-query-models

# start-association-query
band_ids = Tour.where(year: {'$gte' => 2000}).pluck(:band_id)
bands = Band.find(band_ids)
# end-association-query

# start-embed-one
class Band
  include Mongoid::Document
  
  embeds_one :label
end

class Label
  include Mongoid::Document
  field :name, type: String
  
  embedded_in :band
end
# end-embed-one

# start-embed-one-stored
# Band document
{
  "_id" : ObjectId("..."),
  "label" : {
    "_id" : ObjectId("..."),
    "name" : "Periphery",
  }
}
# end-embed-one-stored

# start-embed-store-as
class Band
  include Mongoid::Document
  
  embeds_one :label, store_as: "record_label"
end
# end-embed-store-as

# start-embed-many
class Band
  include Mongoid::Document
  
  embeds_many :albums
end

class Album
  include Mongoid::Document
  field :name, type: String

  embedded_in :band
end
# end-embed-many

# start-embed-many-stored
{
  "_id" : ObjectId("..."),
  "albums" : [
    {
      "_id" : ObjectId("..."),
      "name" : "Omega",
    }
  ]
}
# end-embed-many-stored

# start-embed-many-store-as
class Band
  include Mongoid::Document
  
  embeds_many :albums, store_as: "records"
end
# end-embed-many-store-as

# start-recursive-embed
class Band
  include Mongoid::Document
  field :name, type: String

  recursively_embeds_many
end
# end-recursive-embed

# start-recursive-embed-access
root = Band.new(name: "Linkin Park")

# Add child bands
child_one = root.child_band.build(name: "Lincoln Park")
child_two = root.child_band.build(name: "Xero")

# Access parent band
child_one.parent_band
# Outputs: root
# end-recursive-embed-access

# start-embedded-query
Band.where('tours.year' => {'$gte' => 2000})
# end-embedded-query

# start-embedded-query-pluck
# Get awards for bands that have toured since 2000
Band.where('tours.year' => {'$gte' => 2000}).pluck(:awards)
# end-embedded-query-pluck

# start-embedded-matching
band = Band.where(name: 'Astral Projection').first
tours = band.tours.where(year: {'$gte' => 2000})
# end-embedded-matching

# start-embedded-omit-id
class Album
  include Mongoid::Document
  field :name, type: String
  field :_id, type: Object

  embedded_in :band
end
# end-embedded-omit-id

# start-embedded-clear
band = Band.find(...)
band.tours.clear
# end-embedded-clear

# start-embedded-delete-all
band = Band.find(...)
band.tours.delete_all
# end-embedded-delete-all

# start-embedded-destroy-all
band = Band.find(...)
band.tours.destroy_all
# end-embedded-destroy-all