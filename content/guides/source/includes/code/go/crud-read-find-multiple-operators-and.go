// find code goes here
filter := bson.D{
	{"$and",
		bson.A{
			bson.D{{"surfaceTemperatureC.mean",
				bson.D{{"$lt", 15}},
			}},
			bson.D{{"surfaceTemperatureC.min",
				bson.D{{"$gt", -100}},
			}},
		},
	},
}
cursor, err := coll.Find(context.TODO(), filter)
if err != nil {
	panic(err)
}

