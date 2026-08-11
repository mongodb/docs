docs := []any{
	MyStruct{MyProperty: "Beach House"},
	MyStruct{MyProperty: "Office"},
	MyStruct{MyProperty: "Bungalow"},
}

result, err := coll.InsertMany(context.TODO(), docs)
if err != nil {
	panic(err)
}
