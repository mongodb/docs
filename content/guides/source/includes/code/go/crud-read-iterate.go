// iterate code goes here
for cursor.Next(context.TODO()) {
	var result bson.M
	if err := cursor.Decode(&result); err != nil {
		panic(err)
	}
	fmt.Println(result)
}
if err := cursor.Err(); err != nil {
	panic(err)
}
