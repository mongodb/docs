groupStage := bson.D{{Key: "$group", Value: bson.D{
	{Key: "_id", Value: "$customer_id"},
	{Key: "first_purchase_date", Value: bson.D{{Key: "$first", Value: "$orderdate"}}},
	{Key: "total_value", Value: bson.D{{Key: "$sum", Value: "$value"}}},
	{Key: "total_orders", Value: bson.D{{Key: "$sum", Value: 1}}},
	{Key: "orders", Value: bson.D{{Key: "$push", Value: bson.D{
		{Key: "orderdate", Value: "$orderdate"},
		{Key: "value", Value: "$value"},
	}}}},
}}}
