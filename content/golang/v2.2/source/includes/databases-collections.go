package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	uri := os.Getenv("MONGODB_URI")
	docs := "www.mongodb.com/docs/drivers/go/current/"
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable. " +
			"See: " + docs +
			"usage-examples/#environment-variable")
	}
	client, err := mongo.Connect(options.Client().
		ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// Accesses the test_database database
	// start-access-database
	database := client.Database("test_database")
	// end-access-database

	// Accesses the test_collection collection
	// start-access-collection
	collection := database.Collection("test_collection")
	// end-access-collection
	fmt.Println("Collection accessed:", collection.Name())

	// Explicitly creates a collection in the database
	// start-create-collection
	err = database.CreateCollection(context.TODO(), "example_collection")
	if err != nil {
		log.Fatalf("Failed to create collection: %v", err)
	}
	// end-create-collection

	// Retrieves information about each colllection in the database
	// start-list-collections
	cursor, err := database.ListCollections(context.TODO(), bson.D{})
	if err != nil {
		log.Fatalf("Failed to list collections: %v", err)
	}
	defer cursor.Close(context.TODO())

	for cursor.Next(context.TODO()) {
		var collectionInfo bson.M
		if err := cursor.Decode(&collectionInfo); err != nil {
			log.Fatalf("Failed to decode collection info: %v", err)
		}
		if name, ok := collectionInfo["name"].(string); ok {
			fmt.Println(name)
		} else {
			log.Println("Collection name not found or not a string")
		}
	}

	if err := cursor.Err(); err != nil {
		log.Fatalf("Cursor error: %v", err)
	}
	// end-list-collections

	// Deletes the test_collection collection
	// start-delete-collection
	err = database.Collection("test_collection").Drop(context.TODO())
	if err != nil {
		log.Fatalf("Failed to drop collection: %v", err)
	}
	// end-delete-collection
}
