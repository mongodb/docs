orders := aggDB.Collection("orders")
_, err = orders.InsertMany(ctx, []interface{}{
	Order{
		OrderID: 6363763262239,
		Products: []Product{
			{ProductID: "abc12345", Name: "Asus Laptop", Price: 431},
			{ProductID: "def45678", Name: "Karcher Hose Set", Price: 22},
		},
	},
	Order{
		OrderID: 1197372932325,
		Products: []Product{
			{ProductID: "abc12345", Name: "Asus Laptop", Price: 429},
		},
	},
	Order{
		OrderID: 9812343774839,
		Products: []Product{
			{ProductID: "pqr88223", Name: "Morphy Richards Food Mixer", Price: 431},
			{ProductID: "def45678", Name: "Karcher Hose Set", Price: 21},
		},
	},
	Order{
		OrderID: 4433997244387,
		Products: []Product{
			{ProductID: "def45678", Name: "Karcher Hose Set", Price: 23},
			{ProductID: "jkl77336", Name: "Picky Pencil Sharpene", Price: 1},
			{ProductID: "xyz11228", Name: "Russell Hobbs Chrome Kettle", Price: 16},
		},
	},
})
if err != nil {
	log.Fatal(err)
}
