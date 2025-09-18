package group

import "go.mongodb.org/mongo-driver/v2/bson"

// :snippet-start: order
type Order struct {
	CustomerID string        `bson:"customer_id,omitempty"`
	OrderDate  bson.DateTime `bson:"orderdate"`
	Value      int           `bson:"value"`
}

// :snippet-end:
