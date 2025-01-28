# start-field-default
class Order
  include Mongoid::Document
  
  field :state, type: String, default: 'created'
end
# end-field-default

# start-field-default-processed
class Order
  include Mongoid::Document
  
  field :fulfill_by, type: Time, default: ->{ Time.now + 3.days }
end
# end-field-default-processed

# start-field-default-self
field :fulfill_by, type: Time, default: ->{
  self.submitted_at + 4.hours
}
# end-field-default-self

# start-field-default-pre-processed
field :fulfill_by, type: Time, default: ->{ Time.now + 3.days },
  pre_processed: true
# end-field-default-pre-processed

# start-field-as
class Band
  include Mongoid::Document
  field :n, as: :name, type: String
end
# end-field-as

# start-field-alias
class Band
  include Mongoid::Document
  field :name, type: String
  alias_attribute :n, :name
end
# end-field-alias

# start-field-unalias
class Band
  unalias_attribute :n
end
# end-field-unalias

# start-field-overwrite
class Person
  include Mongoid::Document
  field :name
  field :name, type: String, overwrite: true
end
# end-field-overwrite

# start-custom-id
class Band
  include Mongoid::Document
  field :name, type: String
  field :_id, type: String, default: ->{ name }
end
# end-custom-id

# start-custom-getter-setter
class Person
  include Mongoid::Document
  field :name, type: String

  # Custom getter for 'name' to return the name in uppercase
  def name
    read_attribute(:name).upcase if read_attribute(:name)
  end
  
  # Custom setter for 'name' to store the name in lowercase
  def name=(value)
    write_attribute(:name, value.downcase)
  end
end
# end-custom-getter-setter

# start-localized-field
class Product
  include Mongoid::Document
  field :review, type: String, localize: true
end

I18n.default_locale = :en
product = Product.new
product.review = "Marvelous!"
I18n.locale = :de
product.review = "Fantastisch!"

product.attributes
# Outputs: { "review" => { "en" => "Marvelous!", "de" => "Fantastisch!" }
# end-localized-field

# start-localized-translations
product.review_translations
# Outputs: { "en" => "Marvelous!", "de" => "Fantastisch!" }
product.review_translations =
  { "en" => "Marvelous!", "de" => "Wunderbar!" }
# end-localized-translations

# start-localized-fallbacks
config.i18n.fallbacks = true
config.after_initialize do
  I18n.fallbacks[:de] = [ :en, :es ]
end
# end-localized-fallbacks

# start-localized-fallbacks-non-rails
require "i18n/backend/fallbacks"
I18n::Backend::Simple.send(:include, I18n::Backend::Fallbacks)
I18n.fallbacks[:de] = [ :en, :es ]
# end-localized-fallbacks-non-rails

# start-localized-no-fallbacks
class Product
  include Mongoid::Document
  field :review, type: String, localize: true, fallbacks: false
end
# end-localized-no-fallbacks

# start-localized-query
# Match all products with Marvelous as the review. The current locale is :en.
Product.where(review: "Marvelous!")
# The resulting MongoDB query filter: { "review.en" : "Marvelous!" }
# end-localized-query

# start-read-only
class Band
  include Mongoid::Document
  field :name, type: String
  field :origin, type: String

  attr_readonly :name
end
# end-read-only