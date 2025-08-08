// Replaces the first document that matches a filter by using the Go driver
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

type Restaurant struct {
	Name         string
	RestaurantId string        `bson:"restaurant_id,omitempty"`
	Cuisine      string        `bson:"cuisine,omitempty"`
	Address      interface{}   `bson:"address,omitempty"`
	Borough      string        `bson:"borough,omitempty"`
	Grades       []interface{} `bson:"grades,omitempty"`
}

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/connect/mongoclient/#environment-variable")
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

	coll := client.Database("sample_restaurants").Collection("restaurants")
	filter := bson.D{{"name", "Rizzo's Fine Pizza"}}

	// Creates a new document containing "Name" and "Cuisine" fields
	replacement := Restaurant{Name: "Rizzo's Pizza", Cuisine: "Pizza/American"}

	// Replaces the first document that matches the filter with a new document
	result, err := coll.ReplaceOne(context.TODO(), filter, replacement)
	if err != nil {
		panic(err)
	}

	// Prints the number of modified documents
	if result.MatchedCount != 0 {
		fmt.Println("Number of documents replaced:", result.ModifiedCount)
	}

	// When you run this file for the first time, it should print:
	// Number of documents replaced: 1
}
