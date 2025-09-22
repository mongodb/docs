groupStage := bson.D{{Key: "$group", Value: bson.D{
	{Key: "_id", Value: "$products.prod_id"},
	{Key: "product", Value: bson.D{{Key: "$first", Value: "$products.name"}}},
	{Key: "total_value", Value: bson.D{{Key: "$sum", Value: "$products.price"}}},
	{Key: "quantity", Value: bson.D{{Key: "$sum", Value: 1}}},
}}}
