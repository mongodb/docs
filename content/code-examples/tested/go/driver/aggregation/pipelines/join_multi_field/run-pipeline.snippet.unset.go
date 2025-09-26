unsetStage := bson.D{
	{Key: "$unset", Value: bson.A{"_id", "description"}},
}
