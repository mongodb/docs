type Order struct {
	OrderID  int       `bson:"order_id"`
	Products []Product `bson:"products"`
}

type Product struct {
	ProductID string `bson:"prod_id"`
	Name      string `bson:"name"`
	Price     int    `bson:"price"`
}

