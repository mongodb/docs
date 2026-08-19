for cursor.Next(context.TODO()) {
	var result MyStruct
	if err := cursor.Decode(&result); err != nil {
		log.Fatal(err)
	}
	fmt.Printf("%+v\n", result)
}
if err := cursor.Err(); err != nil {
	log.Fatal(err)
}
