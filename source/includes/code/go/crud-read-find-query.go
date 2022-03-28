// find code goes here
filter := bson.D{{"hasRings", true}}
cursor, err := coll.Find(context.TODO(), bson.D{})
if err != nil {
	panic(err)
}
