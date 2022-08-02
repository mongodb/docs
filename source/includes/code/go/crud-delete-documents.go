// delete code goes here
filter := bson.D{
	{"$and",
		bson.A{
			bson.D{{"orbitalPeriod", bson.D{{"$gt", 5}}}},
			bson.D{{"orbitalPeriod", bson.D{{"$lt", 85}}}},
		},
	},
}
