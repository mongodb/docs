package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-structs
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

	// start-insert-sample-data
	orders := aggDB.Collection("orders")
	products := aggDB.Collection("products")
	orders.DeleteMany(context.TODO(), bson.D{})
	products.DeleteMany(context.TODO(), bson.D{})

	_, err = orders.InsertMany(context.TODO(), []interface{}{
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

	_, err = products.InsertMany(context.TODO(), []interface{}{
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
			Description: "Hose + nosels + winder for tidy storage",
		},
	})
	if err != nil {
		log.Fatal(err)
	}
	// end-insert-sample-data

	// start-match
	matchStage := bson.D{{Key: "$match", Value: bson.D{
		{Key: "orderdate", Value: bson.D{
			{Key: "$gte", Value: time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)},
			{Key: "$lt", Value: time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC)},
		}},
	}}}
	// end-match

	// start-lookup
	lookupStage := bson.D{{Key: "$lookup", Value: bson.D{
		{Key: "from", Value: "products"},
		{Key: "localField", Value: "product_id"},
		{Key: "foreignField", Value: "id"},
		{Key: "as", Value: "product_mapping"},
	}}}
	// end-lookup

	// start-set
	setStage1 := bson.D{{Key: "$set", Value: bson.D{
		{Key: "product_mapping", Value: bson.D{{Key: "$first", Value: "$product_mapping"}}},
	}}}

	setStage2 := bson.D{{Key: "$set", Value: bson.D{
		{Key: "product_name", Value: "$product_mapping.name"},
		{Key: "product_category", Value: "$product_mapping.category"},
	}}}
	// end-set

	// start-unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id", "product_id", "product_mapping"}}}
	// end-unset

	// start-run-agg
	pipeline := mongo.Pipeline{matchStage, lookupStage, setStage1, setStage2, unsetStage}
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
