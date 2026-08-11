for {
	if cursor.TryNext(context.TODO()) {
		var result MyStruct
		if err := cursor.Decode(&result); err != nil {
			log.Fatal(err)
		}
		fmt.Printf("%+v\n", result)
		continue
	}

	if err := cursor.Err(); err != nil {
		log.Fatal(err)
	}
	if cursor.ID() == 0 {
		break
	}
}
