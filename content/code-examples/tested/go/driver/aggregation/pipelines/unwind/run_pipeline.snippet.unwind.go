unwindStage := bson.D{{Key: "$unwind", Value: bson.D{
	{Key: "path", Value: "$products"},
}}}
