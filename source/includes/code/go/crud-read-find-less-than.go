// find code goes here
filter := bson.D{{"surfaceTemperatureC.mean", bson.D{{"$lt", 15}}}}
cursor, err := coll.Find(context.TODO(), filter)
if err != nil {
	panic(err)
}
