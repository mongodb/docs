orders := aggDB.Collection("orders")

_, err = orders.InsertMany(ctx, []interface{}{
	Order{
		CustomerID: "elise_smith@myemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 5, 30, 8, 35, 53, 0, time.UTC)),
		Value:      231,
	},
	Order{
		CustomerID: "elise_smith@myemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 1, 13, 9, 32, 7, 0, time.UTC)),
		Value:      99,
	},
	Order{
		CustomerID: "oranieri@warmmail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 1, 01, 8, 25, 37, 0, time.UTC)),
		Value:      63,
	},
	Order{
		CustomerID: "tj@wheresmyemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2019, 5, 28, 19, 13, 32, 0, time.UTC)),
		Value:      2,
	},
	Order{
		CustomerID: "tj@wheresmyemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 11, 23, 22, 56, 53, 0, time.UTC)),
		Value:      187,
	},
	Order{
		CustomerID: "tj@wheresmyemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 8, 18, 23, 4, 48, 0, time.UTC)),
		Value:      4,
	},
	Order{
		CustomerID: "elise_smith@myemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 12, 26, 8, 55, 46, 0, time.UTC)),
		Value:      4,
	},
	Order{
		CustomerID: "tj@wheresmyemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2021, 2, 29, 7, 49, 32, 0, time.UTC)),
		Value:      1024,
	},
	Order{
		CustomerID: "elise_smith@myemail.com",
		OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 10, 3, 13, 49, 44, 0, time.UTC)),
		Value:      102,
	},
})
if err != nil {
	log.Fatal(err)
}
