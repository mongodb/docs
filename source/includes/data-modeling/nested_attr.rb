# start-simple-nested
class Band
  include Mongoid::Document
  embeds_many :albums
  belongs_to :producer
  accepts_nested_attributes_for :albums, :producer
end
# end-simple-nested

#start-use-method
# Retrieves a Band instance
band = Band.where(name: 'Tennis').first
# Updates the "producer" association
band.producer_attributes = { name: 'Alaina Moore' }
#end-use-method

# start-create-attr
band = Band.create(
  name: 'Tennis',
  albums_attributes: [
    { name: 'Swimmer', year: 2020 },
    { name: 'Young & Old', year: 2013 }]
)
# end-create-attr

# start-update-create
band = Band.where(name: 'Vampire Weekend').first
band.update(albums_attributes: [
  { name: 'Contra', year: 2010 } 
])
# end-update-create

# start-update-id
band = Band.where(name: 'Vampire Weekend').first
# Retrieves the first entry from the albums array
album = band.albums.first
# Updates the entry by passing the _id value
band.update(albums_attributes: [
  { _id: album._id, year: 2011 } ])
# end-update-id

# start-delete-id
band = Band.where(name: 'Vampire Weekend').first
# Retrieves the first entry from the albums array
album = band.albums.first
# Deletes the entry by passing the _id value
band.update(albums_attributes: [
  { _id: album._id, _destroy: true } ])
# end-delete-id

# start-multiple-ops
band = Band.where(name: 'Yeah Yeah Yeahs').first
# Performs multiple data changes
band.update(albums_attributes: [
  { name: 'Show Your Bones', year: 2006 },
  { _id: 1, name: 'Fever To T3ll' },
  { _id: 2, _destroy: true } ])
# end-multiple-ops