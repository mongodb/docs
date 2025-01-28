# start-time-series-config
class Measurement
  include Mongoid::Document

  field :temperature, type: Integer
  field :timestamp, type: Time

  store_in collection_options: {
    time_series: {
      timeField: "timestamp",
      granularity: "minutes"
    },
    expire_after: 604800
  }
end
# end-time-series-config

# start-capped-collection-config
class Blog
  include Mongoid::Document

  store_in collection_options: {
    capped: true,
    size: 1024
  }
end
# end-capped-collection-config

# start-default-collation-config
class Title
  include Mongoid::Document

  store_in collection_options: {
    collation: {
      locale: 'fr'
    }
  }
end
# end-default-collation-config