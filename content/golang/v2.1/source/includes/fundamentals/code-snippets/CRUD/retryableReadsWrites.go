package main

import (
	"context"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/connect/mongoclient/#environment-variable")
	}

	// start-retryable-example
	// Defines the client options
	clientOps := options.Client().
		ApplyURI(uri).
		SetRetryWrites(false).
		SetRetryReads(false)

	// Creates a new client using the specified options
	client, err := mongo.Connect(clientOps)
	if err != nil {
		panic(err)
	}
	// end-retryable-example

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
}
