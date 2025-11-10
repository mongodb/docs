embeddedUnsetStage := bson.D{
	{Key: "$unset", Value: bson.A{"_id", "product_name", "product_variation"}},
}
