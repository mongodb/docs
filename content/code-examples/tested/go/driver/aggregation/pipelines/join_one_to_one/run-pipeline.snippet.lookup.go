lookupStage := bson.D{{Key: "$lookup", Value: bson.D{
	{Key: "from", Value: "products"},
	{Key: "localField", Value: "product_id"},
	{Key: "foreignField", Value: "id"},
	{Key: "as", Value: "product_mapping"},
}}}
