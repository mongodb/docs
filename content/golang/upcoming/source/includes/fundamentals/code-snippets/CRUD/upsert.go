// Updates or inserts a matching document by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-plant-struct
type Plant struct {
	Species string
	PlantID int32 `bson:"plant_id"`
	Height  float64
}

// end-plant-struct

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	client.Database("db").Collection("plants").Drop(context.TODO())

	// begin insertDocs
	coll := client.Database("db").Collection("plants")
	docs := []interface{}{
		Plant{Species: "Polyscias fruticosa", PlantID: 1, Height: 27.6},
		Plant{Species: "Polyscias fruticosa", PlantID: 2, Height: 34.9},
		Plant{Species: "Ledebouria socialis", PlantID: 1, Height: 11.4},
	}

	result, err := coll.InsertMany(context.TODO(), docs)
	//end insertDocs
	if err != nil {
		panic(err)
	}
	fmt.Printf("Number of documents inserted: %d\n", len(result.InsertedIDs))

	fmt.Println("\nUpsert:\n")
	{
		// Creates a filter to match documents with a specified
		// "species" and "plant_id" and an update document to set new fields
		// begin upsert
		filter := bson.D{{"species", "Ledebouria socialis"}, {"plant_id", 3}}
		update := bson.D{{"$set", bson.D{{"species", "Ledebouria socialis"}, {"plant_id", 3}, {"height", 8.3}}}}

		// Sets the upsert option to true
		opts := options.UpdateOne().SetUpsert(true)

		// Updates a documents or inserts a document if no documents are
		// matched and prints the results
		result, err := coll.UpdateOne(context.TODO(), filter, update, opts)
		if err != nil {
			panic(err)
		}

		fmt.Printf("Number of documents updated: %v\n", result.ModifiedCount)
		fmt.Printf("Number of documents upserted: %v\n", result.UpsertedCount)
		// end upsert
	}

	fmt.Println("\nAll Documents in Collection:\n")
	{
		cursor, err := coll.Find(context.TODO(), bson.D{})
		if err != nil {
			panic(err)
		}

		var results []Plant
		if err = cursor.All(context.TODO(), &results); err != nil {
			panic(err)
		}
		for _, result := range results {
			res, _ := bson.MarshalExtJSON(result, false, false)
			fmt.Println(string(res))
		}
	}
}
