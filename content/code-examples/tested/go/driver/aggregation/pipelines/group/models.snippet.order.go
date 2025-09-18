type Order struct {
	CustomerID string        `bson:"customer_id,omitempty"`
	OrderDate  bson.DateTime `bson:"orderdate"`
	Value      int           `bson:"value"`
}

