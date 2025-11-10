embeddedPipeline := mongo.Pipeline{embeddedMatchProductInfoStage, embeddedMatchOrderDateStage, embeddedUnsetStage}

lookupStage := bson.D{
	{Key: "$lookup", Value: bson.D{
		{Key: "from", Value: "orders"},
		{Key: "let", Value: bson.D{
			{Key: "prdname", Value: "$name"},
			{Key: "prdvartn", Value: "$variation"},
		}},
		{Key: "pipeline", Value: embeddedPipeline},
		{Key: "as", Value: "orders"},
	}},
}
