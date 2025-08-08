// Deletes multiple documents from a collection by using the Go driver
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

// Defines a Restaurant struct as a model for documents in the "restaurants" collection
type Restaurant struct {
	ID      bson.ObjectID `bson:"_id"`
	Name    string        `bson:"name"`
	Borough string        `bson:"borough"`
	Cuisine string        `bson:"cuisine"`
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
	filter := bson.D{
		{"borough", "Queens"},
		{"cuisine", "German"},
	}

	// Deletes all documents that have a "Borough" value of "Queens" and a "Cuisine" value of "German"
	results, err := coll.DeleteMany(context.TODO(), filter)
	if err != nil {
		panic(err)
	}

	// Prints the number of deleted documents
	fmt.Printf("Documents deleted: %d\n", results.DeletedCount)

	// When you run this file for the first time, it prints output similar to the following:
	// Documents deleted: 6
}
