package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-structs
type Order struct {
	OrderID  int       `bson:"order_id"`
	Products []Product `bson:"products"`
}

type Product struct {
	ProductID string `bson:"prod_id"`
	Name      string `bson:"name"`
	Price     int    `bson:"price"`
}

// end-structs

func main() {
	const uri = "<connection string>"

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()

	aggDB := client.Database("agg_tutorials_db")

	// start-insert-orders
	orders := aggDB.Collection("orders")
	orders.DeleteMany(context.TODO(), bson.D{})

	_, err = orders.InsertMany(context.TODO(), []interface{}{
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
	// end-insert-orders

	// start-unwind
	unwindStage := bson.D{{Key: "$unwind", Value: bson.D{
		{Key: "path", Value: "$products"},
	}}}
	// end-unwind

	// start-match
	matchStage := bson.D{{Key: "$match", Value: bson.D{
		{Key: "products.price", Value: bson.D{{Key: "$gt", Value: 15}}},
	}}}
	// end-match

	// start-group
	groupStage := bson.D{{Key: "$group", Value: bson.D{
		{Key: "_id", Value: "$products.prod_id"},
		{Key: "product", Value: bson.D{{Key: "$first", Value: "$products.name"}}},
		{Key: "total_value", Value: bson.D{{Key: "$sum", Value: "$products.price"}}},
		{Key: "quantity", Value: bson.D{{Key: "$sum", Value: 1}}},
	}}}
	// end-group

	// start-set
	setStage := bson.D{{Key: "$set", Value: bson.D{
		{Key: "product_id", Value: "$_id"},
	}}}
	// end-set

	// start-unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id"}}}
	// end-unset

	// start-run-agg
	pipeline := mongo.Pipeline{unwindStage, matchStage, groupStage, setStage, unsetStage}
	cursor, err := orders.Aggregate(context.TODO(), pipeline)
	// end-run-agg

	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err := cursor.Close(context.TODO()); err != nil {
			log.Fatalf("failed to close cursor: %v", err)
		}
	}()

	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatalf("failed to decode results: %v", err)
	}
	for _, result := range results {
		res, _ := bson.MarshalExtJSON(result, false, false)
		fmt.Println(string(res))
	}
}
