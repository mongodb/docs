matchStage := bson.D{
	{Key: "$match", Value: bson.D{
		{Key: "orders", Value: bson.D{{Key: "$ne", Value: bson.A{}}}},
	}},
}
