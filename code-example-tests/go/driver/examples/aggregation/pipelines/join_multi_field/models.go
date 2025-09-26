package join_multi_field

import "go.mongodb.org/mongo-driver/v2/bson"

// :snippet-start: product-order
type Product struct {
	Name        string
	Variation   string
	Category    string
	Description string
}

type Order struct {
	CustomerID       string        `bson:"customer_id"`
	OrderDate        bson.DateTime `bson:"orderdate"`
	ProductName      string        `bson:"product_name"`
	ProductVariation string        `bson:"product_variation"`
	Value            float32       `bson:"value"`
}

// :snippet-end:
