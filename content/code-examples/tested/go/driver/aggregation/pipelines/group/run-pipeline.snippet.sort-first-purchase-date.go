sortStageFirstPurchaseDate := bson.D{{Key: "$sort", Value: bson.D{
	{Key: "first_purchase_date", Value: 1},
}}}
