package join_one_to_one

import "go.mongodb.org/mongo-driver/v2/bson"

// :snippet-start: order-and-product
type Order struct {
	CustomerID string        `bson:"customer_id"`
	OrderDate  bson.DateTime `bson:"orderdate"`
	ProductID  string        `bson:"product_id"`
	Value      float32       `bson:"value"`
}

type Product struct {
	ID          string `bson:"id"`
	Name        string `bson:"name"`
	Category    string `bson:"category"`
	Description string `bson:"description"`
}

// :snippet-end:
