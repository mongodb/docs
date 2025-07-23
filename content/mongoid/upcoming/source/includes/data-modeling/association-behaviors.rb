# start-extensions
class Band
  include Mongoid::Document

  embeds_many :albums do
    def find_by_name(name)
      where(name: name).first
    end
  end
end

band.albums.find_by_name("Omega") # returns album "Omega"
# end-extensions

# start-custom-name
class Band
  include Mongoid::Document

  embeds_many :records, class_name: "Album"
end
# end-custom-name

# start-custom-keys
class Band
  include Mongoid::Document

  field :band_id, type: String
  has_many :albums, primary_key: 'band_id', foreign_key: 'band_id_ref'
end

class Album
  include Mongoid::Document

  field :band_id_ref, type: String
  belongs_to :band, primary_key: 'band_id', foreign_key: 'band_id_ref'
end
# end-custom-keys

# start-custom-inverse-keys
class Band
  include Mongoid::Document

  field :band_id, type: String
  field :member_ids, type: Array

  has_many :members, 
    primary_key: 'member_id', foreign_key: 'member_ids',
    inverse_primary_key: 'band_id', inverse_foreign_key: 'band_ids'
end

class Member
  include Mongoid::Document

  field :member_id, type: String
  field :band_ids, type: Array

  has_many :bands,
    primary_key: 'band_id', foreign_key: 'band_ids',
    inverse_primary_key: 'member_id', inverse_foreign_key: 'member_ids'
end
# end-custom-inverse-keys

# start-custom-scope
class Band
  include Mongoid::Document

  has_many :albums, scope: -> { where(published: true) }
  
  # Uses a scope called "upcoming" on the Tour model
  has_many :tours, scope: :upcoming
end
# end-custom-scope

# start-validation-false
class Band
  include Mongoid::Document

  embeds_many :albums, validate: false
end
# end-validation-false

# start-polymorphic
class Tour
  include Mongoid::Document

  has_one :band, as: :featured
end

class Label
  include Mongoid::Document

  has_one :band, as: :featured
end

class Band
  include Mongoid::Document

  belongs_to :featured, polymorphic: true
end
# end-polymorphic

# start-custom-polymorphic
class Band
  include Mongoid::Document

  identify_as 'artist'
  has_many :albums, as: :record
end
# end-custom-polymorphic

# start-multiple-alias
class Band
  include Mongoid::Document

  identify_as 'artist', 'group', 'troupe'
  has_many :albums, as: :record
end
# end-multiple-alias

# start-polymorphic-resolvers
Mongoid::ModelResolver.register_resolver Mongoid::ModelResolver.new, :mus
Mongoid::ModelResolver.register_resolver Mongoid::ModelResolver.new, :tool

module Music
  class Band
    include Mongoid::Document

    identify_as 'bnd', resolver: :mus
  end
end

module Tools
  class Band
    include Mongoid::Document

    identify_as 'bnd', resolver: :tool
  end
end
# end-polymorphic-resolvers

# start-dependent
class Band
  include Mongoid::Document

  has_many :albums, dependent: :delete_all
  belongs_to :label, dependent: :nullify
end
# end-dependent

# start-autosave
class Band
  include Mongoid::Document
  
  has_many :albums
end

class Album
  include Mongoid::Document
  
  belongs_to :band, autosave: true
end

band = Band.new
album = Album.create!(band: band)
# The band is persisted at this point.
# end-autosave

# start-autobuild
class Band
  include Mongoid::Document

  embeds_one :label, autobuild: true
  has_one :producer, autobuild: true
end
# end-autobuild

# start-touch
class Band
  include Mongoid::Document

  field :name
  belongs_to :label, touch: true
end
# end-touch

# start-touch-specific
class Band
  include Mongoid::Document

  belongs_to :label, touch: :bands_updated_at
end
# end-touch-specific

# start-counter-cache
class Band
  include Mongoid::Document

  belongs_to :label, counter_cache: true
end

class Label
  include Mongoid::Document
  include Mongoid::Attributes::Dynamic

  has_many :bands
end
# end-counter-cache

# start-access-metadata
# Get the metadata for a named association from the class or document
Model.reflect_on_association(:<association_name>)

# Directly access metadata on a document
model.associations[:<association_name>]
# end-access-metadata

# start-attributes
class Band
  include Mongoid::Document

  embeds_many :songs
end

Band.songs = [ song ]
Band.songs._target # returns [ song ]
Band.songs._base # returns band
Band.songs._association # returns the association metadata
# end-attributes