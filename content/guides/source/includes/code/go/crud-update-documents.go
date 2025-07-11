// database and colletion code goes here
db := client.Database("sample_guides")
coll := db.Collection("comets")

// update code goes here
filter := bson.D{{}}
update := bson.D{{"$mul", bson.D{{"radius", 1.60934}}}}

result, err := coll.UpdateMany(context.TODO(), filter, update)
if err != nil {
	panic(err)
}
