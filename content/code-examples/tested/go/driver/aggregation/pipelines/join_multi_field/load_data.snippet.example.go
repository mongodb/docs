products := aggDB.Collection("products")
orders := aggDB.Collection("orders")

_, err = products.InsertMany(ctx, []interface{}{
	Product{
		Name:        "Asus Laptop",
		Variation:   "Ultra HD",
		Category:    "ELECTRONICS",
		Description: "Great for watching movies",
	},
	Product{
		Name:        "Asus Laptop",
		Variation:   "Standard Display",
		Category:    "ELECTRONICS",
		Description: "Good value laptop for students",
	},
	Product{
		Name:        "The Day Of The Triffids",
		Variation:   "1st Edition",
		Category:    "BOOKS",
		Description: "Classic post-apocalyptic novel",
	},
	Product{
		Name:        "The Day Of The Triffids",
		Variation:   "2nd Edition",
		Category:    "BOOKS",
		Description: "Classic post-apocalyptic novel",
	},
	Product{
		Name:        "Morphy Richards Food Mixer",
		Variation:   "Deluxe",
		Category:    "KITCHENWARE",
		Description: "Luxury mixer turning good cakes into great",
	},
})
if err != nil {
	log.Fatal(err)
}

_, err = orders.InsertMany(ctx, []interface{}{
	Order{
		CustomerID:       "elise_smith@myemail.com",
		OrderDate:        bson.NewDateTimeFromTime(time.Date(2020, 5, 30, 8, 35, 52, 0, time.UTC)),
		ProductName:      "Asus Laptop",
		ProductVariation: "Standard Display",
		Value:            431.43,
	},
	Order{
		CustomerID:       "tj@wheresmyemail.com",
		OrderDate:        bson.NewDateTimeFromTime(time.Date(2019, 5, 28, 19, 13, 32, 0, time.UTC)),
		ProductName:      "The Day Of The Triffids",
		ProductVariation: "2nd Edition",
		Value:            5.01,
	},
	Order{
		CustomerID:       "oranieri@warmmail.com",
		OrderDate:        bson.NewDateTimeFromTime(time.Date(2020, 1, 1, 8, 25, 37, 0, time.UTC)),
		ProductName:      "Morphy Richards Food Mixer",
		ProductVariation: "Deluxe",
		Value:            63.13,
	},
	Order{
		CustomerID:       "jjones@tepidmail.com",
		OrderDate:        bson.NewDateTimeFromTime(time.Date(2020, 12, 26, 8, 55, 46, 0, time.UTC)),
		ProductName:      "Asus Laptop",
		ProductVariation: "Standard Display",
		Value:            429.65,
	},
})
if err != nil {

	log.Fatal(err)
}
