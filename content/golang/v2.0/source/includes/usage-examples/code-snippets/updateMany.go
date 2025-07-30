// Updates documents that match a query filter by using the Go driver
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

	// begin updatemany
	coll := client.Database("sample_airbnb").Collection("listingsAndReviews")
	filter := bson.D{{"address.market", "Sydney"}}

	// Creates instructions to update the values of the "price" field
	update := bson.D{{"$mul", bson.D{{"price", 1.15}}}}

	// Updates documents in which the value of the "address.market"
	// field is "Sydney"
	result, err := coll.UpdateMany(context.TODO(), filter, update)
	if err != nil {
		panic(err)
	}
	// end updatemany

	// Prints the number of updated documents
	fmt.Printf("Documents updated: %v\n", result.ModifiedCount)

	// When you run this file for the first time, it should print:
	// Number of documents replaced: 609
}
