orders := aggDB.Collection("orders")
products := aggDB.Collection("products")

_, err = orders.InsertMany(ctx, []interface{}{
	Order{
		CustomerID: "elise_smith@myemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 5, 30, 8, 35, 52, 0, time.UTC)),
		ProductID:  "a1b2c3d4",
		Value:      431.43,
	},
	Order{
		CustomerID: "tj@wheresmyemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2019, 5, 28, 19, 13, 32, 0, time.UTC)),
		ProductID:  "z9y8x7w6",
		Value:      5.01,
	},
	Order{
		CustomerID: "oranieri@warmmail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 01, 01, 8, 25, 37, 0, time.UTC)),
		ProductID:  "ff11gg22hh33",
		Value:      63.13,
	},
	Order{
		CustomerID: "jjones@tepidmail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 12, 26, 8, 55, 46, 0, time.UTC)),
		ProductID:  "a1b2c3d4",
		Value:      429.65,
	},
})
if err != nil {

	log.Fatal(err)
}

_, err = products.InsertMany(ctx, []interface{}{
	Product{
		ID:          "a1b2c3d4",
		Name:        "Asus Laptop",
		Category:    "ELECTRONICS",
		Description: "Good value laptop for students",
	},
	Product{
		ID:          "z9y8x7w6",
		Name:        "The Day Of The Triffids",
		Category:    "BOOKS",
		Description: "Classic post-apocalyptic novel",
	},
	Product{
		ID:          "ff11gg22hh33",
		Name:        "Morphy Richardds Food Mixer",
		Category:    "KITCHENWARE",
		Description: "Luxury mixer turning good cakes into great",
	},
	Product{
		ID:          "pqr678st",
		Name:        "Karcher Hose Set",
		Category:    "GARDEN",
		Description: "Hose + nozzles + winder for tidy storage",
	},
})
if err != nil {
	log.Fatal(err)
}
