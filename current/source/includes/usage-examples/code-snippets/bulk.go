// Runs bulk write operations on a collection by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-restaurant-struct
type Restaurant struct {
	Name         string
	RestaurantId string        `bson:"restaurant_id,omitempty"`
	Cuisine      string        `bson:"cuisine,omitempty"`
	Address      interface{}   `bson:"address,omitempty"`
	Borough      string        `bson:"borough,omitempty"`
	Grades       []interface{} `bson:"grades,omitempty"`
}

// end-restaurant-struct

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
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

	// begin bulk
	coll := client.Database("sample_restaurants").Collection("restaurants")

	// Creates write models that specify replace and update operations
	models := []mongo.WriteModel{
		mongo.NewReplaceOneModel().SetFilter(bson.D{{"name", "Cafe Tomato"}}).
			SetReplacement(Restaurant{Name: "Cafe Zucchini", Cuisine: "French"}),
		mongo.NewUpdateOneModel().SetFilter(bson.D{{"name", "Cafe Zucchini"}}).
			SetUpdate(bson.D{{"$set", bson.D{{"name", "Zucchini Land"}}}}),
	}

	// Specifies that the bulk write is ordered
	opts := options.BulkWrite().SetOrdered(true)

	// Runs a bulk write operation for the specified write operations
	results, err := coll.BulkWrite(context.TODO(), models, opts)
	// end bulk

	if err != nil {
		panic(err)
	}

	// When you run this file for the first time, it should print:
	// Number of documents replaced or modified: 2
	fmt.Printf("Number of documents replaced or modified: %d", results.ModifiedCount)
}
