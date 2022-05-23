// delete code goes here
filter := bson.D{
	{"$and",
		bson.A{
			bson.D{{"OrbitalPeriod", bson.D{{"$gt", 5}}}},
			bson.D{{"OrbitalPeriod", bson.D{{"$lt", 85}}}},
		},
	},
}
