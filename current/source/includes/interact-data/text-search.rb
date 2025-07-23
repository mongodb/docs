# start-text-index-model
class Dish
  include Mongoid::Document

  field :name, type: String
  field :description, type: String

  index description: 'text'
end
# end-text-index-model

# start-term
Dish.where('$text' => {'$search' => 'herb'})
# end-term

# start-phrase
Dish.where('$text' => {'$search' => "\"serves 2\""})
# end-phrase

# start-exclude
Dish.where('$text' => {'$search' => 'vegan -tofu'})
# end-exclude