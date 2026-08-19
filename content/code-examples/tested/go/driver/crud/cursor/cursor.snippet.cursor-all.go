var results []MyStruct
if err := cursor.All(context.TODO(), &results); err != nil {
	panic(err)
}
for _, result := range results {
	fmt.Printf("%+v\n", result)
}
