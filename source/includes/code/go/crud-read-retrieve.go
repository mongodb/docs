// find code goes here
cursor, err := coll.Find(context.TODO(), bson.D{})
if err != nil {
	panic(err)
}
