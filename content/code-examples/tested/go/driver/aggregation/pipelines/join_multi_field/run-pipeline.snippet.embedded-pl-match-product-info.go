embeddedMatchProductInfoStage := bson.D{
	{Key: "$match", Value: bson.D{
		{Key: "$expr", Value: bson.D{
			{Key: "$and", Value: bson.A{
				bson.D{{Key: "$eq", Value: bson.A{"$product_name", "$$prdname"}}},
				bson.D{{Key: "$eq", Value: bson.A{"$product_variation", "$$prdvartn"}}},
			}},
		}},
	}},
}
