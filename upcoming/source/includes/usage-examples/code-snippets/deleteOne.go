// Deletes a document from a collection by using the Go driver
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

	// begin deleteOne
	coll := client.Database("sample_mflix").Collection("movies")
	filter := bson.D{{"title", "Twilight"}}

	// Deletes the first document that has a "title" value of "Twilight"
	result, err := coll.DeleteOne(context.TODO(), filter)

	// Prints a message if any errors occur during the operation
	if err != nil {
		panic(err)
	}
	// end deleteOne

	// Prints the number of deleted documents
	fmt.Printf("Documents deleted: %d\n", result.DeletedCount)

	// When you run this file for the first time, it should print:
	// Documents deleted: 1
}
