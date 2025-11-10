setStage := bson.D{{Key: "$set", Value: bson.D{
	{Key: "product_id", Value: "$_id"},
}}}
