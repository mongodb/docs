# start create index
class Restaurant
  include Mongoid::Document
  
  field :name, type: String
  field :cuisine, type: String
  field :borough, type: String

  index({ cuisine: 1}, { name: "cuisine_index", unique: false })
end
    
Restaurant.create_indexes
# end create index

# start create alias index
class Restaurant
  include Mongoid::Document

  field :borough, as: :b

  index({ b: 1}, { name: "borough_index" })
end
# end create alias index

# start create embedded index
class Address
  include Mongoid::Document

  field :street, type: String
end

class Restaurant
  include Mongoid::Document

  embeds_many :addresses
  index({"addresses.street": 1})
end
# end create embedded index

# start create compound index
class Restaurant
  include Mongoid::Document

  field :name, type: String
  field :borough, type: String

  index({borough: 1, name: -1}, { name: "compound_index"})
end
# end create compound index

# start create 2dsphere index
class Restaurant
  include Mongoid::Document

  field :location, type: Array

  index({location: "2dsphere"}, { name: "location_index"})
end
# end create 2dsphere index

# start create sparse index
class Restaurant
  include Mongoid::Document
  
  field :name, type: String
  field :cuisine, type: String
  field :borough, type: String

  index({ borough: 1}, { sparse: true })
end
# end create sparse index

# start create multiple indexes
class Restaurant
  include Mongoid::Document
  
  field :name, type: String
  field :cuisine, type: String
  field :borough, type: String
  
  index({ name: 1})
  index({ cuisine: -1})
end

Restaurant.create_indexes
# end create multiple indexes

# start drop indexes
Restaurant.remove_indexes
# end drop indexes

# start create atlas search index
class Restaurant
  include Mongoid::Document
  
  field :name, type: String
  field :cuisine, type: String
  field :borough, type: String

  search_index :my_search_index, 
      mappings: { 
          fields: { 
              name: { 
                  type: "string" 
              },
              cuisine: {
                  type: "string"
              }
          }, 
          dynamic: true 
      }
end

Restaurant.create_search_indexes
# end create atlas search index

# start remove atlas search index
Restaurant.remove_search_indexes
# end remove atlas search index

#start list atlas search index
Restaurant.search_indexes.each { |index| puts index }
# end list atlas search index
