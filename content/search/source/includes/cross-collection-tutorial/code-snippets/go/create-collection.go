package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// Connect to the MongoDB deployment
	ctx := context.Background()
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)

	// Set namespace
	collection := client.Database("sample_supplies").Collection("purchaseOrders")

	// Create first document
	jan23, _ := time.Parse(time.RFC3339, "2018-01-23T21:06:49.506Z")
	purchaseOrder1 := bson.M{
		"saleDate": jan23,
		"items": []bson.M{
			{
				"name":     "printer paper",
				"tags":     []string{"office", "stationary"},
				"price":    40.01,
				"quantity": 2,
			},
			{
				"name":     "notepad",
				"tags":     []string{"office", "writing", "school"},
				"price":    35.29,
				"quantity": 2,
			},
			{
				"name":     "pens",
				"tags":     []string{"writing", "office", "school", "stationary"},
				"price":    56.12,
				"quantity": 5,
			},
			{
				"name":     "backpack",
				"tags":     []string{"school", "travel", "kids"},
				"price":    77.71,
				"quantity": 2,
			},
			{
				"name":     "notepad",
				"tags":     []string{"office", "writing", "school"},
				"price":    18.47,
				"quantity": 2,
			},
			{
				"name":     "envelopes",
				"tags":     []string{"stationary", "office", "general"},
				"price":    19.95,
				"quantity": 8,
			},
			{
				"name":     "envelopes",
				"tags":     []string{"stationary", "office", "general"},
				"price":    8.08,
				"quantity": 3,
			},
			{
				"name":     "binder",
				"tags":     []string{"school", "general", "organization"},
				"price":    14.16,
				"quantity": 3,
			},
		},
		"storeLocation": "Denver",
		"customer": bson.M{
			"gender":       "M",
			"age":          42,
			"email":        "cauho@witwuta.sv",
			"satisfaction": 4,
		},
		"couponUsed":     true,
		"purchaseMethod": "Phone",
	}

	// Create second document
	jan25, _ := time.Parse(time.RFC3339, "2018-01-25T10:01:02.918Z")
	purchaseOrder2 := bson.M{
		"saleDate": jan25,
		"items": []bson.M{
			{
				"name":     "envelopes",
				"tags":     []string{"stationary", "office", "general"},
				"price":    8.05,
				"quantity": 10,
			},
			{
				"name":     "binder",
				"tags":     []string{"school", "general", "organization"},
				"price":    28.31,
				"quantity": 9,
			},
			{
				"name":     "notepad",
				"tags":     []string{"office", "writing", "school"},
				"price":    20.95,
				"quantity": 3,
			},
			{
				"name":     "laptop",
				"tags":     []string{"electronics", "school", "office"},
				"price":    866.5,
				"quantity": 4,
			},
			{
				"name":     "notepad",
				"tags":     []string{"office", "writing", "school"},
				"price":    33.09,
				"quantity": 4,
			},
			{
				"name":     "printer paper",
				"tags":     []string{"office", "stationary"},
				"price":    37.55,
				"quantity": 1,
			},
			{
				"name":     "backpack",
				"tags":     []string{"school", "travel", "kids"},
				"price":    83.28,
				"quantity": 2,
			},
			{
				"name":     "pens",
				"tags":     []string{"writing", "office", "school", "stationary"},
				"price":    42.9,
				"quantity": 4,
			},
			{
				"name":     "envelopes",
				"tags":     []string{"stationary", "office", "general"},
				"price":    16.68,
				"quantity": 2,
			},
		},
		"storeLocation": "Seattle",
		"customer": bson.M{
			"gender":       "M",
			"age":          50,
			"email":        "keecade@hem.uy",
			"satisfaction": 5,
		},
		"couponUsed":     false,
		"purchaseMethod": "Phone",
	}

	// Insert the documents
	_, err = collection.InsertOne(ctx, purchaseOrder1)
	if err != nil {
		panic(err)
	}

	_, err = collection.InsertOne(ctx, purchaseOrder2)
	if err != nil {
		panic(err)
	}

	fmt.Println("Successfully inserted purchase order documents.")

	// Query the new collection
	findOptions := options.Find().SetSort(bson.D{{Key: "saleDate", Value: -1}})
	cursor, err := collection.Find(ctx, bson.D{}, findOptions)
	if err != nil {
		panic(err)
	}
	defer cursor.Close(ctx)

	// Print results
	var results []bson.M
	if err = cursor.All(ctx, &results); err != nil {
		panic(err)
	}

	fmt.Println("\nQuery results:")
	for _, result := range results {
		fmt.Println(result)
	}
}
