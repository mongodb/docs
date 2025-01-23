// Updates the first document that matches a query filter by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/bson/primitive"
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

	// begin updateone
	coll := client.Database("sample_restaurants").Collection("restaurants")
	id, _ := primitive.ObjectIDFromHex("5eb3d668b31de5d588f42a7a")
	filter := bson.D{{"_id", id}}

	// Creates instructions to add the "avg_rating" field to documents
	update := bson.D{{"$set", bson.D{{"avg_rating", 4.4}}}}

	// Updates the first document that has the specified "_id" value
	result, err := coll.UpdateOne(context.TODO(), filter, update)
	if err != nil {
		panic(err)
	}
	// end updateone

	// Prints the number of updated documents
	fmt.Printf("Documents updated: %v\n", result.ModifiedCount)

	// When you run this file for the first time, it should print:
	// Number of documents replaced: 1
}
