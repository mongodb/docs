package main

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-uri-variable
// Connection string with connection pool options
const uri = "mongodb://localhost:27017/?maxPoolSize=50&minPoolSize=10&maxIdleTimeMS=30000"

// end-uri-variable
func main() {
	// start-apply-uri
	// Creates a new client and connects to the server
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	// end-apply-uri

	fmt.log("Connected to MongoDB with connection pool options")
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()
}
