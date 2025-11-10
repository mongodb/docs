setStage := bson.D{{Key: "$set", Value: bson.D{
	{Key: "customer_id", Value: "$_id"},
}}}
