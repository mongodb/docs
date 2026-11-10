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
	products := aggDB.Collection("products")
	orders := aggDB.Collection("orders")
	products.DeleteMany(context.TODO(), bson.D{})
	orders.DeleteMany(context.TODO(), bson.D{})

	_, err = products.InsertMany(context.TODO(), []interface{}{
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

	_, err = orders.InsertMany(context.TODO(), []interface{}{
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
	// end-insert-sample-data

	// start-embedded-pl-match1
	embeddedMatchStage1 := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "$expr", Value: bson.D{
				{Key: "$and", Value: bson.A{
					bson.D{{Key: "$eq", Value: bson.A{"$product_name", "$$prdname"}}},
					bson.D{{Key: "$eq", Value: bson.A{"$product_variation", "$$prdvartn"}}},
				}},
			}},
		}},
	}
	// end-embedded-pl-match1

	// start-embedded-pl-match2
	embeddedMatchStage2 := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "orderdate", Value: bson.D{
				{Key: "$gte", Value: time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)},
				{Key: "$lt", Value: time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC)},
			}},
		}},
	}
	// end-embedded-pl-match2

	// start-embedded-pl-unset
	embeddedUnsetStage := bson.D{
		{Key: "$unset", Value: bson.A{"_id", "product_name", "product_variation"}},
	}
	// end-embedded-pl-unset

	// start-lookup
	embeddedPipeline := mongo.Pipeline{embeddedMatchStage1, embeddedMatchStage2, embeddedUnsetStage}

	lookupStage := bson.D{
		{Key: "$lookup", Value: bson.D{
			{Key: "from", Value: "orders"},
			{Key: "let", Value: bson.D{
				{Key: "prdname", Value: "$name"},
				{Key: "prdvartn", Value: "$variation"},
			}},
			{Key: "pipeline", Value: embeddedPipeline},
			{Key: "as", Value: "orders"},
		}},
	}
	// end-lookup

	// start-match
	matchStage := bson.D{
		{Key: "$match", Value: bson.D{
			{Key: "orders", Value: bson.D{{Key: "$ne", Value: bson.A{}}}},
		}},
	}
	// end-match

	// start-unset
	unsetStage := bson.D{
		{Key: "$unset", Value: bson.A{"_id", "description"}},
	}
	// end-unset

	// start-run-agg
	pipeline := mongo.Pipeline{lookupStage, matchStage, unsetStage}
	cursor, err := products.Aggregate(context.TODO(), pipeline)
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
