// find code goes here
filter := bson.D{
	{"$and",
		bson.A{
			bson.D{{"hasRings", false}},
			bson.D{{"mainAtmosphere", "Ar"}},
		},
	},
}
cursor, err := coll.Find(context.TODO(), filter)
if err != nil {
	panic(err)
}
