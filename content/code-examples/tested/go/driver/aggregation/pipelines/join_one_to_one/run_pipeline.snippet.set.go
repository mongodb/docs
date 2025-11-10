setProductMappingStage := bson.D{{Key: "$set", Value: bson.D{
	{Key: "product_mapping", Value: bson.D{{Key: "$first", Value: "$product_mapping"}}},
}}}

setProductNameCategoryStage := bson.D{{Key: "$set", Value: bson.D{
	{Key: "product_name", Value: "$product_mapping.name"},
	{Key: "product_category", Value: "$product_mapping.category"},
}}}
