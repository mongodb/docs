// find code goes here
filter := bson.D{
	{"$or",
		bson.A{
			bson.D{{"orderFromSun",
				bson.D{{"$gt", 7}},
			}},
			bson.D{{"orderFromSun", bson.D{{"$lt", 2}}}},
		},
	},
}

cursor, err := coll.Find(context.TODO(), filter)
if err != nil {
	panic(err)
}

