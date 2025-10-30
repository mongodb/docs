package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Connection string with cluster settings options
// start-uri-variable
const uri = "mongodb://localhost:27017/?serverSelectionTimeoutMS=10000&localThresholdMS=20"

// end-uri-variable

func main() {
	// Creates a new client and connects to the server
	// start-apply-uri
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	// end-apply-uri

	fmt.Println("Connected to MongoDB with cluster settings options")
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()
}
