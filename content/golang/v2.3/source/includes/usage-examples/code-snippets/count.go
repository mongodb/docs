// Counts documents in a collection by using the Go driver
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
	ID           bson.ObjectID `bson:"_id"`
	Name         string
	RestaurantId string `bson:"restaurant_id"`
	Cuisine      string
	Address      interface{}
	Borough      string
	Grades       interface{}
}

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

	coll := client.Database("sample_restaurants").Collection("restaurants")

	// Specifies a filter to match documents where the "cuisine" field
	// has a value of "American"
	filter := bson.D{{"cuisine", "American"}}

	// Retrieves and prints the estimated number of documents in the collection
	estCount, estCountErr := coll.EstimatedDocumentCount(context.TODO())
	if estCountErr != nil {
		panic(estCountErr)
	}

	// Retrieves and prints the number of matching documents in the collection
	count, err := coll.CountDocuments(context.TODO(), filter)
	if err != nil {
		panic(err)
	}

	// When you run this file, it should print:
	// Estimated number of documents in the movies collection: 25359
	// Number of restaurants with American cuisine: 6183
	fmt.Printf("Estimated number of documents in the restaurants collection: %d\n", estCount)
	fmt.Printf("Number of restaurants with American cuisine: %d\n", count)
}
