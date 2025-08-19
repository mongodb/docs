// Inserts a single document describing a restaurant by using the Go driver with bson.D
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

	// Inserts a sample document describing a restaurant into the collection using bson.D
	coll := client.Database("sample_restaurants").Collection("restaurants")
	newRestaurant := bson.D{
		bson.E{Key: "name", Value: "8282"},
		bson.E{Key: "cuisine", Value: "Korean"},
	}

	result, err := coll.InsertOne(context.TODO(), newRestaurant)
	if err != nil {
		panic(err)
	}

	// Prints the ID of the inserted document
	fmt.Printf("Document inserted with ID: %s\n", result.InsertedID)

	// When you run this file for the first time, it should print output similar
	// to the following:
	// Document inserted with ID: ObjectID("...")
}
