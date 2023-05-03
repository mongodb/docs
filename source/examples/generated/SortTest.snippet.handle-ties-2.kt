collection.find().sort(Sorts.ascending(FoodOrder::letter.name, "_id"))
